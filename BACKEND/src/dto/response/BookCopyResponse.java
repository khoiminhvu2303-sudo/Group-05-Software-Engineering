package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookCopyResponse {

    private Long id;
    private String barcode;
    private String status; // e.g., AVAILABLE, BORROWED, RESERVED, LOST
    private String condition; // e.g., NEW, GOOD, DAMAGED
}
