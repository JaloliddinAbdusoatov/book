package uz.bookstore.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;

public record CreateOrderRequest(
        @NotBlank(message = "Ism familiya kiritilishi shart")
        @Size(max = 300, message = "Ism familiya 300 belgidan oshmasligi kerak")
        String customerName,

        @NotBlank(message = "Telefon raqam kiritilishi shart")
        @Pattern(regexp = "^\\+?[0-9]{9,15}$", message = "Telefon raqam formati noto'g'ri")
        String phoneNumber,

        @NotBlank(message = "Yetkazib berish manzili kiritilishi shart")
        @Size(max = 1000, message = "Manzil 1000 belgidan oshmasligi kerak")
        String deliveryAddress,

        @Size(max = 1000, message = "Izoh 1000 belgidan oshmasligi kerak")
        String notes,

        @NotEmpty(message = "Kamida bitta kitob tanlang")
        @Valid
        List<OrderItemRequest> items
) {}
