package com.library.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBookDTO {

    private String title;
    private String describe;
    private LocalDate publication;
    private Integer stockQuantity;
    private String authorId;
    private String publisherId;
    private String categoryId;
    private String status;
}
