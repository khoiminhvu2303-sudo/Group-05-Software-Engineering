package com.library.event;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
public class EventPublisher {

    private final ApplicationEventPublisher applicationEventPublisher;

    public EventPublisher(ApplicationEventPublisher applicationEventPublisher) {
        this.applicationEventPublisher = applicationEventPublisher;
    }

    public void publishBorrowCreated(Long borrowRecordId, Long readerId) {
        applicationEventPublisher.publishEvent(new BorrowCreatedEvent(borrowRecordId, readerId));
    }

    public void publishBookReturned(Long borrowRecordId, Long bookCopyId) {
        applicationEventPublisher.publishEvent(new BookReturnedEvent(borrowRecordId, bookCopyId));
    }

    public void publishFineIssued(Long fineReceiptId, Long readerId, java.math.BigDecimal amount) {
        applicationEventPublisher.publishEvent(new FineIssuedEvent(fineReceiptId, readerId, amount));
    }
}