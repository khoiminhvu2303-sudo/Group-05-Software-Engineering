package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BorrowStatsResponse {
    private long totalBorrowed;
    private long totalReturned;
    private double averageBorrowDays;
}
