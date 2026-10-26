package uz.bookstore.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record UpdateBookRequest(
        @Size(max = 500) String title,
        @Size(max = 500) String subtitle,
        @Size(max = 300) String authorName,
        String description,
        @Size(max = 1000) String shortDescription,
        @DecimalMin(value = "0.0", message = "Narx 0 dan kam bo'lmasligi kerak") BigDecimal price,
        @Min(value = 0, message = "Ombordagi miqdor 0 dan kam bo'lmasligi kerak") Integer stockQuantity,
        Integer pages,
        @Size(max = 50) String language,
        Integer publicationYear,
        @Size(max = 20) String isbn,
        @Size(max = 300) String publisher,
        @Size(max = 1000) String coverImageUrl,
        String authorBio,
        @Size(max = 1000) String authorImageUrl,
        String authorAchievements,
        String tableOfContents,
        Boolean isActive
) {}
