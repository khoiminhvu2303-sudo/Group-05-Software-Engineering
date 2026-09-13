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
public class OverdueBookResponse {
    private String recordId;
    private String bookId;
    private String title;
    private String readerName;
    private LocalDate dueDate;
    private long overdueDays;
}