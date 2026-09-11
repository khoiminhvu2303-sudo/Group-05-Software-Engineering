package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BorrowRecordResponse {

    private Long id;
    private Long readerId;
    private String readerName;
    private Long staffId;
    private String staffName;
    private LocalDateTime borrowDate;
    private LocalDateTime dueDate;
    private LocalDateTime returnDate;
    private String status; // e.g., BORROWED, RETURNED, OVERDUE, RENEWED
    private Integer renewalCount;
    private List<BookCopyResponse> borrowedCopies;
}
