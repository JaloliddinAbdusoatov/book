package uz.bookstore.dto;

import jakarta.validation.constraints.*;

public record OrderItemRequest(
        @NotNull(message = "Kitob ID kiritilishi shart")
        Long bookId,

        @NotNull(message = "Miqdor kiritilishi shart")
        @Min(value = 1, message = "Kamida 1 dona bo'lishi kerak")
        @Max(value = 100, message = "Bir buyurtmada 100 donadan ko'p bo'lmasligi kerak")
        Integer quantity
) {}
