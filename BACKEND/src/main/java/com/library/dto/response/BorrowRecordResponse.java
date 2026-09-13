package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BorrowRecordResponse {
    private String transactionId;
    private String readerId;
    private String readerName;
    private String staffId;
    private String staffName;
    private LocalDate dateBorrow;
    private LocalDate dueDate;
}
