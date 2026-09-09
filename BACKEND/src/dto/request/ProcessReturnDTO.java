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
public class ProcessReturnDTO {

    @NotBlank(message = "Borrow detail ID is required")
    private String borrowDetailId;

    @NotBlank(message = "Book status is required")
    private String bookStatus;

    private String description;
}
