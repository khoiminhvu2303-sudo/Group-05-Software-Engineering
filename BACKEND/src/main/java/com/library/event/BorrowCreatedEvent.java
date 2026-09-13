package com.library.event;

import java.time.LocalDateTime;

public class BorrowCreatedEvent {
    private final Long borrowRecordId;
    private final Long readerId;
    private final LocalDateTime timestamp;

    public BorrowCreatedEvent(Long borrowRecordId, Long readerId) {
        this.borrowRecordId = borrowRecordId;
        this.readerId = readerId;
        this.timestamp = LocalDateTime.now();
    }

    public Long getBorrowRecordId() { return borrowRecordId; }
    public Long getReaderId() { return readerId; }
    public LocalDateTime getTimestamp() { return timestamp; }
}