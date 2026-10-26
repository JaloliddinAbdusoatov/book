package uz.bookstore.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record BookResponse(
        Long id,
        String title,
        String subtitle,
        String authorName,
        String description,
        String shortDescription,
        BigDecimal price,
        Integer stockQuantity,
        boolean inStock,
        Integer pages,
        String language,
        Integer publicationYear,
        String isbn,
        String publisher,
        String coverImageUrl,
        String authorBio,
        String authorImageUrl,
        String authorAchievements,
        String tableOfContents,
        List<BookImageResponse> images,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
