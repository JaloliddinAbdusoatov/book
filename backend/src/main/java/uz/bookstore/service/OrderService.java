package uz.bookstore.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.bookstore.dto.*;
import uz.bookstore.entity.*;
import uz.bookstore.exception.BadRequestException;
import uz.bookstore.exception.InsufficientStockException;
import uz.bookstore.exception.ResourceNotFoundException;
import uz.bookstore.repository.BookRepository;
import uz.bookstore.repository.OrderRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class OrderService {

    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;

    public OrderService(OrderRepository orderRepository, BookRepository bookRepository) {
        this.orderRepository = orderRepository;
        this.bookRepository = bookRepository;
    }

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
        CustomerOrder order = new CustomerOrder();
        order.setOrderReference(generateOrderReference());
        order.setCustomerName(request.customerName());
        order.setPhoneNumber(request.phoneNumber());
        order.setDeliveryAddress(request.deliveryAddress());
        order.setNotes(request.notes());
        order.setStatus(OrderStatus.NEW);

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : request.items()) {
            Book book = bookRepository.findByIdAndIsActiveTrue(itemRequest.bookId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Kitob topilmadi: " + itemRequest.bookId()));

            if (book.getStockQuantity() < itemRequest.quantity()) {
                throw new InsufficientStockException(
                        String.format("'%s' kitobi omborda yetarli emas. Mavjud: %d, So'ralgan: %d",
                                book.getTitle(), book.getStockQuantity(), itemRequest.quantity()));
            }

            // Deduct stock
            book.setStockQuantity(book.getStockQuantity() - itemRequest.quantity());
            bookRepository.save(book);

            // Create order item with price snapshot
            OrderItem item = new OrderItem();
            item.setBook(book);
            item.setBookTitle(book.getTitle());
            item.setQuantity(itemRequest.quantity());
            item.setUnitPrice(book.getPrice());
            item.setSubtotal(book.getPrice().multiply(BigDecimal.valueOf(itemRequest.quantity())));

            order.addItem(item);
            totalAmount = totalAmount.add(item.getSubtotal());
        }

        order.setTotalAmount(totalAmount);

        // Add initial status history
        OrderStatusHistory history = new OrderStatusHistory();
        history.setOrder(order);
        history.setOldStatus(null);
        history.setNewStatus(OrderStatus.NEW);
        history.setChangedBy("system");
        history.setNotes("Buyurtma yaratildi");
        order.getStatusHistory().add(history);

        CustomerOrder saved = orderRepository.save(order);
        log.info("Order created: {} for customer: {}", saved.getOrderReference(), saved.getCustomerName());

        return toResponse(saved);
    }

    public OrderResponse getOrderByReference(String reference) {
        CustomerOrder order = orderRepository.findByOrderReference(reference)
                .orElseThrow(() -> new ResourceNotFoundException("Buyurtma topilmadi: " + reference));
        return toResponse(order);
    }

    public OrderResponse getOrderById(Long id) {
        CustomerOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Buyurtma topilmadi: " + id));
        return toResponse(order);
    }

    public Page<OrderResponse> searchOrders(String search, OrderStatus status,
                                             LocalDateTime fromDate, LocalDateTime toDate,
                                             Pageable pageable) {
        return orderRepository.searchOrders(search, status, fromDate, toDate, pageable)
                .map(this::toResponse);
    }

    @Transactional
    public OrderResponse updateOrderStatus(Long id, UpdateOrderStatusRequest request, String changedBy) {
        CustomerOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Buyurtma topilmadi: " + id));

        OrderStatus oldStatus = order.getStatus();
        OrderStatus newStatus = request.status();

        validateStatusTransition(oldStatus, newStatus);

        // If cancelling, restore stock
        if (newStatus == OrderStatus.CANCELLED && oldStatus != OrderStatus.CANCELLED) {
            for (OrderItem item : order.getItems()) {
                Book book = item.getBook();
                book.setStockQuantity(book.getStockQuantity() + item.getQuantity());
                bookRepository.save(book);
            }
        }

        order.setStatus(newStatus);

        OrderStatusHistory history = new OrderStatusHistory();
        history.setOrder(order);
        history.setOldStatus(oldStatus);
        history.setNewStatus(newStatus);
        history.setChangedBy(changedBy);
        history.setNotes(request.notes());
        order.getStatusHistory().add(history);

        CustomerOrder saved = orderRepository.save(order);
        log.info("Order {} status changed: {} -> {} by {}", order.getOrderReference(), oldStatus, newStatus, changedBy);

        return toResponse(saved);
    }

    public DashboardStats getDashboardStats() {
        long totalOrders = orderRepository.count();
        long newOrders = orderRepository.countByStatus(OrderStatus.NEW);
        long confirmedOrders = orderRepository.countByStatus(OrderStatus.CONFIRMED);
        long processingOrders = orderRepository.countByStatus(OrderStatus.PROCESSING);
        long shippedOrders = orderRepository.countByStatus(OrderStatus.SHIPPED);
        long deliveredOrders = orderRepository.countByStatus(OrderStatus.DELIVERED);
        long cancelledOrders = orderRepository.countByStatus(OrderStatus.CANCELLED);
        BigDecimal totalRevenue = orderRepository.calculateTotalRevenue();

        LocalDateTime todayStart = LocalDate.now().atStartOfDay();
        BigDecimal todayRevenue = orderRepository.calculateRevenueSince(todayStart);
        long todayOrders = orderRepository.countByCreatedAtAfter(todayStart);

        Map<String, Long> ordersByStatus = new LinkedHashMap<>();
        ordersByStatus.put("NEW", newOrders);
        ordersByStatus.put("CONFIRMED", confirmedOrders);
        ordersByStatus.put("PROCESSING", processingOrders);
        ordersByStatus.put("SHIPPED", shippedOrders);
        ordersByStatus.put("DELIVERED", deliveredOrders);
        ordersByStatus.put("CANCELLED", cancelledOrders);

        return new DashboardStats(
                totalOrders, newOrders, confirmedOrders, processingOrders,
                shippedOrders, deliveredOrders, cancelledOrders,
                totalRevenue, todayRevenue, todayOrders, ordersByStatus
        );
    }

    private void validateStatusTransition(OrderStatus from, OrderStatus to) {
        if (from == OrderStatus.DELIVERED) {
            throw new BadRequestException("Yetkazib berilgan buyurtma holatini o'zgartirib bo'lmaydi");
        }
        if (from == OrderStatus.CANCELLED) {
            throw new BadRequestException("Bekor qilingan buyurtma holatini o'zgartirib bo'lmaydi");
        }
    }

    private String generateOrderReference() {
        String uuid = UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase();
        return "BK-" + uuid;
    }

    private OrderResponse toResponse(CustomerOrder order) {
        var items = order.getItems().stream()
                .map(item -> new OrderItemResponse(
                        item.getId(),
                        item.getBook().getId(),
                        item.getBookTitle(),
                        item.getQuantity(),
                        item.getUnitPrice(),
                        item.getSubtotal()
                ))
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getOrderReference(),
                order.getCustomerName(),
                order.getPhoneNumber(),
                order.getDeliveryAddress(),
                order.getNotes(),
                order.getStatus(),
                order.getTotalAmount(),
                items,
                order.getCreatedAt(),
                order.getUpdatedAt()
        );
    }
}
