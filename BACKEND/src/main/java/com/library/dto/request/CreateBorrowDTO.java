package com.library.dto.request;

import jakarta.validation.constraints.NotEmpty;
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
public class CreateBorrowDTO {

    @NotNull(message = "Reader ID is required")
    private String readerId;

    @NotNull(message = "Staff ID is required")
    private String staffId;

    @NotNull(message = "Due date is required")
    private LocalDate dueDate;

    @NotEmpty(message = "At least one book copy must be provided")
    private List<String> copyIds;
}
