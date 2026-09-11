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
public class FineRevenueResponseDTO {

    private String period; // e.g., "2026-09" or "Q3-2026"
    private BigDecimal totalCollected;
    private BigDecimal totalUnpaid;
    private long totalFineReceipts;
}
