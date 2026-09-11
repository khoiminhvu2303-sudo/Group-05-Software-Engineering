package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BorrowStatsResponse {

    private String period;
    private String startDate;
    private String endDate;
    private long totalBorrows;
    private long totalReturns;
    private long totalRenewals;
    private Map<String, Long> borrowsByDate;
}
