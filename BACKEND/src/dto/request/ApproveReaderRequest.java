package com.library.dto.request;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApproveReaderRequest {

    @Min(value = 1, message = "Validity period in months must be at least 1")
    private Integer validityMonths;

    private String note;
}
