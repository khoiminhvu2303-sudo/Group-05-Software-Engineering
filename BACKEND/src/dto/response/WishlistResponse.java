package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WishlistResponse {

    private Long id;
    private String bookId;
    private String bookTitle;
    private String bookIsbn;
    private String publisher;
    private Integer availableCopies;
    private LocalDateTime addedDate;
}
