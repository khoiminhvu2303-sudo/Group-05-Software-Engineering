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
public class FineResponse {
    private String fineId;
    private String borrowerId;
    private String description;
    private BigDecimal amount;
    private String status;
}
