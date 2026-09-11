package com.library.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateFineRequest {

    @NotNull(message = "Reader ID is required")
    private Long readerId;

    private Long borrowRecordId;

    @NotNull(message = "Fine amount is required")
    @DecimalMin(value = "0.01", message = "Fine amount must be greater than zero")
    private BigDecimal amount;

    @NotBlank(message = "Reason is required")
    private String reason; // e.g., OVERDUE_BOOK, DAMAGED_BOOK, LOST_BOOK
}
