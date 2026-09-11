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
public class PayFineRequest {

    @NotNull(message = "Amount paid is required")
    @DecimalMin(value = "0.01", message = "Amount paid must be greater than zero")
    private BigDecimal amountPaid;

    @NotBlank(message = "Payment method is required")
    private String paymentMethod; // e.g., CASH, CREDIT_CARD, BANK_TRANSFER, ONLINE

    private String transactionReference;
    private String note;
}
