package uz.bookstore.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import uz.bookstore.dto.CreateOrderRequest;
import uz.bookstore.dto.OrderItemRequest;
import uz.bookstore.dto.OrderResponse;
import uz.bookstore.dto.UpdateOrderStatusRequest;
import uz.bookstore.entity.Book;
import uz.bookstore.entity.CustomerOrder;
import uz.bookstore.entity.OrderStatus;
import uz.bookstore.exception.InsufficientStockException;
import uz.bookstore.repository.BookRepository;
import uz.bookstore.repository.OrderRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private OrderService orderService;

    private Book testBook;

    @BeforeEach
    void setUp() {
        testBook = new Book();
        testBook.setId(1L);
        testBook.setTitle("Zamonaviy Pedagogika");
        testBook.setPrice(BigDecimal.valueOf(85000));
        testBook.setStockQuantity(100);
        testBook.setIsActive(true);
    }

    @Test
    void createOrder_Success() {
        when(bookRepository.findByIdAndIsActiveTrue(1L)).thenReturn(Optional.of(testBook));
        when(orderRepository.save(any(CustomerOrder.class))).thenAnswer(invocation -> {
            CustomerOrder order = invocation.getArgument(0);
            order.setId(10L);
            return order;
        });

        CreateOrderRequest request = new CreateOrderRequest(
                "Aziza Karimova",
                "+998901234567",
                "Toshkent shahar, Chilonzor 5",
                "Dastxat bilan",
                List.of(new OrderItemRequest(1L, 2))
        );

        OrderResponse response = orderService.createOrder(request);

        assertNotNull(response);
        assertEquals("Aziza Karimova", response.customerName());
        assertEquals(BigDecimal.valueOf(170000), response.totalAmount());
        assertEquals(OrderStatus.NEW, response.status());
        assertEquals(98, testBook.getStockQuantity()); // 100 - 2

        verify(bookRepository).save(testBook);
        verify(orderRepository).save(any(CustomerOrder.class));
    }

    @Test
    void createOrder_InsufficientStock_ThrowsException() {
        testBook.setStockQuantity(1);
        when(bookRepository.findByIdAndIsActiveTrue(1L)).thenReturn(Optional.of(testBook));

        CreateOrderRequest request = new CreateOrderRequest(
                "Nodir Aliyev",
                "+998901234567",
                "Samarqand",
                "",
                List.of(new OrderItemRequest(1L, 5))
        );

        assertThrows(InsufficientStockException.class, () -> orderService.createOrder(request));
        verify(orderRepository, never()).save(any());
    }

    @Test
    void updateOrderStatus_Success() {
        CustomerOrder order = new CustomerOrder();
        order.setId(10L);
        order.setOrderReference("BK-12345678");
        order.setStatus(OrderStatus.NEW);
        order.setTotalAmount(BigDecimal.valueOf(85000));

        when(orderRepository.findById(10L)).thenReturn(Optional.of(order));
        when(orderRepository.save(any(CustomerOrder.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UpdateOrderStatusRequest updateRequest = new UpdateOrderStatusRequest(OrderStatus.CONFIRMED, "Tasdiqlandi");
        OrderResponse result = orderService.updateOrderStatus(10L, updateRequest, "admin");

        assertNotNull(result);
        assertEquals(OrderStatus.CONFIRMED, result.status());
        assertEquals(1, order.getStatusHistory().size());
        assertEquals("admin", order.getStatusHistory().get(0).getChangedBy());
    }
}
