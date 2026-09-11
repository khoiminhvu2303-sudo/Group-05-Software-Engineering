package com.library.dto.request;

import jakarta.validation.constraints.NotEmpty;
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
public class CreateBorrowRequest {

    @NotNull(message = "Reader ID is required")
    private Long readerId;

    @NotEmpty(message = "Book copy IDs are required")
    private List<Long> bookCopyIds;

    private Integer borrowDays;
}
