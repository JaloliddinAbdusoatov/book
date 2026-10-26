package uz.bookstore.dto;

public record LoginResponse(
        String token,
        String username,
        String fullName
) {}
