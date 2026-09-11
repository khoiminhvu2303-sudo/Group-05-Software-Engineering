package com.library.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddToWishlistDTO {

    @NotBlank(message = "Reader ID is required")
    private String readerId;

    @NotBlank(message = "Book ID is required")
    private String bookId;
}
