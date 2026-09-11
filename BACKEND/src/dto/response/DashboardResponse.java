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
public class DashboardResponse {

    private long totalBooks;
    private long totalActiveReaders;
    private long totalBorrowedBooks;
    private long totalOverdueBooks;
    private BigDecimal totalFineRevenue;
    private long pendingReaderApprovals;
}
