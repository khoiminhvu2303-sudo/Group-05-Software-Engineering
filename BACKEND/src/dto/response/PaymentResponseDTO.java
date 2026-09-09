package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponseDTO {

    private String paymentId;
    private String fineId;
    private BigDecimal amount;
    private String paymentMethod;
    private String paymentUrl; // Redirect URL to payment gateway (VNPay/MoMo)
    private String status;     // PENDING, SUCCESS, FAILED
    private LocalDateTime createdAt;
}
