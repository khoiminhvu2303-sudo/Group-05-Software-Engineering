package com.library.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RenewBookDTO {

    @NotBlank(message = "Borrow detail ID is required")
    private String borrowDetailId;

    @Min(value = 1, message = "Extended days must be at least 1")
    private int extendedDays;
}
