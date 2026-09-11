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
public class ChangeReaderStatusRequest {

    @NotBlank(message = "Status is required")
    private String status; // e.g., ACTIVE, INACTIVE, SUSPENDED, PENDING
}
