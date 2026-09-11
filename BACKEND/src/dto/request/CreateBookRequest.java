package com.library.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateBookRequest {

    @NotBlank(message = "ISBN is required")
    private String isbn;

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private Integer publicationYear;

    private String publisher;

    @NotNull(message = "Author IDs are required")
    private List<Long> authorIds;

    @NotNull(message = "Category IDs are required")
    private List<Long> categoryIds;

    @Min(value = 1, message = "Total copies must be at least 1")
    private Integer totalCopies;
}
