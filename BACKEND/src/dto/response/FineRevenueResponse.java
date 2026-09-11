package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FineRevenueResponse {

    private String startDate;
    private String endDate;
    private BigDecimal totalRevenue;
    private BigDecimal totalUnpaidFines;
    private long totalFinesIssued;
    private Map<String, BigDecimal> revenueByPaymentMethod;
}
