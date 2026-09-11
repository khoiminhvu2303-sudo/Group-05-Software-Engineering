package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReturnResponseDTO {

    private String borrowDetailId;
    private String transactionId;
    private String readerId;
    private String readerName;
    private String bookCopyId;
    private String bookTitle;
    private LocalDate returnDate;
    private LocalDate dueDate;
    private long overdueDays;
    private BigDecimal fineAmount;
    private String status; // RETURNED, DAMAGED, LOST
}
