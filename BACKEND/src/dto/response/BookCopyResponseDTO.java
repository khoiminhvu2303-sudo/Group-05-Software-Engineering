package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookCopyResponseDTO {

    private String copyId;
    private String bookId;
    private String bookTitle;
    private String barcode;
    private String status; // AVAILABLE, BORROWED, LOST, DAMAGED
}
