package com.library.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RenewBookRequest {

    @NotNull(message = "Extension days are required")
    @Min(value = 1, message = "Extension days must be at least 1")
    private Integer extensionDays;
}
