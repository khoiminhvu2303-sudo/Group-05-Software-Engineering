package com.library.event;

import java.time.LocalDateTime;

public class BookReturnedEvent {
    private final Long borrowRecordId;
    private final Long bookCopyId;
    private final LocalDateTime returnDate;

    public BookReturnedEvent(Long borrowRecordId, Long bookCopyId) {
        this.borrowRecordId = borrowRecordId;
        this.bookCopyId = bookCopyId;
        this.returnDate = LocalDateTime.now();
    }

    public Long getBorrowRecordId() { return borrowRecordId; }
    public Long getBookCopyId() { return bookCopyId; }
    public LocalDateTime getReturnDate() { return returnDate; }
}