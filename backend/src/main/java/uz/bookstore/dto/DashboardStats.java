package uz.bookstore.dto;

import java.math.BigDecimal;
import java.util.Map;

public record DashboardStats(
        long totalOrders,
        long newOrders,
        long confirmedOrders,
        long processingOrders,
        long shippedOrders,
        long deliveredOrders,
        long cancelledOrders,
        BigDecimal totalRevenue,
        BigDecimal todayRevenue,
        long todayOrders,
        Map<String, Long> ordersByStatus
) {}
