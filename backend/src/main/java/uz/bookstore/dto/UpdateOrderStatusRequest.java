package uz.bookstore.dto;

import jakarta.validation.constraints.NotNull;
import uz.bookstore.entity.OrderStatus;

public record UpdateOrderStatusRequest(
        @NotNull(message = "Buyurtma holati kiritilishi shart")
        OrderStatus status,

        String notes
) {}
