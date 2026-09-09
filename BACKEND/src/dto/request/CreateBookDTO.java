package com.library.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateBookDTO {

    @NotBlank(message = "Title is required")
    private String title;

    private String describe;

    private LocalDate publication;

    @NotNull(message = "Stock quantity is required")
    @Min(value = 0, message = "Stock quantity cannot be negative")
    private Integer stockQuantity;

    @NotBlank(message = "Author ID is required")
    private String authorId;

    @NotBlank(message = "Publisher ID is required")
    private String publisherId;

    @NotBlank(message = "Category ID is required")
    private String categoryId;
}
