package uz.bookstore.dto;

import java.util.List;

public record ApiError(
        int status,
        String message,
        List<FieldError> errors
) {
    public record FieldError(
            String field,
            String message
    ) {}
}
