package uz.bookstore.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import uz.bookstore.entity.CustomerOrder;
import uz.bookstore.entity.OrderStatus;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<CustomerOrder, Long> {

    Optional<CustomerOrder> findByOrderReference(String orderReference);

    @Query("SELECT o FROM CustomerOrder o WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(o.orderReference) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(o.customerName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "o.phoneNumber LIKE CONCAT('%', :search, '%')) " +
           "AND (:status IS NULL OR o.status = :status) " +
           "AND (:fromDate IS NULL OR o.createdAt >= :fromDate) " +
           "AND (:toDate IS NULL OR o.createdAt <= :toDate)")
    Page<CustomerOrder> searchOrders(
            @Param("search") String search,
            @Param("status") OrderStatus status,
            @Param("fromDate") LocalDateTime fromDate,
            @Param("toDate") LocalDateTime toDate,
            Pageable pageable
    );

    long countByStatus(OrderStatus status);

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM CustomerOrder o WHERE o.status != 'CANCELLED'")
    java.math.BigDecimal calculateTotalRevenue();

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM CustomerOrder o WHERE o.status != uz.bookstore.entity.OrderStatus.CANCELLED AND o.createdAt >= :since")
    java.math.BigDecimal calculateRevenueSince(@Param("since") LocalDateTime since);

    long countByCreatedAtAfter(LocalDateTime since);
}
