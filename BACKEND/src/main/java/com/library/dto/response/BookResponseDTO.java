package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookResponseDTO {

    private String bookId;
    private String title;
    private String describe;
    private LocalDate publication;
    private Integer stockQuantity;
    private String status;
    private String authorName;
    private String publisherName;
    private String categoryName;
}
