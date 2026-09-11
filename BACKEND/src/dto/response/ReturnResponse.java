package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReturnResponse {

    private Long id;
    private Long borrowRecordId;
    private Long readerId;
    private String readerName;
    private Long staffId;
    private String staffName;
    private LocalDateTime returnDate;
    private List<BookCopyResponse> returnedCopies;
    private boolean isOverdue;
    private long overdueDays;
    private BigDecimal fineAmount;
    private String note;
}
