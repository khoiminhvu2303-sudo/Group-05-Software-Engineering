package com.library.dto.request;

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
public class ProcessReturnRequest {

    @NotNull(message = "Borrow record ID is required")
    private Long borrowRecordId;

    @NotNull(message = "Returned book copy IDs are required")
    private List<Long> bookCopyIds;

    private String condition; // e.g., GOOD, DAMAGED, LOST

    private String note;
}
