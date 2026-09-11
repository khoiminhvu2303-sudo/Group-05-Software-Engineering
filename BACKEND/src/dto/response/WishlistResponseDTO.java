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
public class WishlistResponseDTO {

    private String wishlistId;
    private String readerId;
    private String bookId;
    private String bookTitle;
    private String authorName;
    private String categoryName;
    private boolean isAvailable;
    private LocalDateTime addedAt;
}
