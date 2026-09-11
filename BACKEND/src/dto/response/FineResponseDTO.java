package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FineResponseDTO {

    private String fineId;
    private String transactionId;
    private String readerName;
    private String describe;
    private BigDecimal amount;
    private String paymentStatus; // PAID, UNPAID
}
