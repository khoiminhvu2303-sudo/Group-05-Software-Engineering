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
public class ApproveReaderDTO {

    @NotBlank(message = "Reader ID is required")
    private String readerId;

    @NotBlank(message = "Approved status is required (e.g., ACTIVE, REJECTED)")
    private String status;

    private String note;
}
