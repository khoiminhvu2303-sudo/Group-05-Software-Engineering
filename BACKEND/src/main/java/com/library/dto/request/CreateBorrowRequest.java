package com.library.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateBorrowRequest {
    @NotBlank(message = "Reader ID is required")
    private String readerId;

    @NotBlank(message = "Staff ID is required")
    private String staffId;

    @NotNull(message = "Due date is required")
    private LocalDate dueDate;

    private List<String> copyIds;
}
