package uz.bookstore.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "Foydalanuvchi nomi kiritilishi shart")
        String username,

        @NotBlank(message = "Parol kiritilishi shart")
        String password
) {}
