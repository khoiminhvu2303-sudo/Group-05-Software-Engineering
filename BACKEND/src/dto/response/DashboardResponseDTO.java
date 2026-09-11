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
public class DashboardResponseDTO {

    private long totalBooks;
    private long totalActiveReaders;
    private long totalActiveBorrows;
    private long totalOverdueBooks;
    private BigDecimal totalFineRevenue;
}
