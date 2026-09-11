package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OverdueBookResponse {

    private Long borrowRecordId;
    private String bookTitle;
    private String bookBarcode;
    private Long readerId;
    private String readerName;
    private String readerEmail;
    private String readerPhone;
    private LocalDateTime dueDate;
    private long overdueDays;
}
