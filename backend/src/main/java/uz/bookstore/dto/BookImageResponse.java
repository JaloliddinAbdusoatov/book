package uz.bookstore.dto;

public record BookImageResponse(
        Long id,
        String imageUrl,
        String altText,
        Integer sortOrder
) {}
