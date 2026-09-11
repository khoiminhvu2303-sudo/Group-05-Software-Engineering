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
public class OverdueBookResponseDTO {

    private String transactionId;
    private String readerId;
    private String readerName;
    private String bookTitle;
    private String copyBarcode;
    private LocalDate dueDate;
    private long overdueDays;
}
