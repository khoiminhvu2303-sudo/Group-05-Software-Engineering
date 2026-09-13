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
public class ReportResponseDTO {

    private long totalBooks;
    private long totalActiveReaders;
    private long totalBorrows;
    private long totalOverdue;
    private BigDecimal totalFinesCollected;
}
