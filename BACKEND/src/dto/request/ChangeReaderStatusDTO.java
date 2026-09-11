package com.library.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangeReaderStatusDTO {

    @NotBlank(message = "Reader ID is required")
    private String readerId;

    @NotBlank(message = "New status is required (e.g., ACTIVE, LOCKED, SUSPENDED)")
    private String status;

    private String reason;
}
