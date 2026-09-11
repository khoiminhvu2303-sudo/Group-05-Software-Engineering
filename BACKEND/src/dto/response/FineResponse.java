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
public class FineResponse {

    private String id;
    private Long readerId;
    private String readerName;
    private Long borrowRecordId;
    private BigDecimal amount;
    private BigDecimal amountPaid;
    private String reason;
    private String status; // e.g., UNPAID, PARTIALLY_PAID, PAID, WAIVED
    private LocalDateTime issuedDate;
    private LocalDateTime paidDate;
    private String paymentMethod;
}
