package com.library.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBookRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private Integer publicationYear;

    private String publisher;

    private List<Long> authorIds;

    private List<Long> categoryIds;
}
