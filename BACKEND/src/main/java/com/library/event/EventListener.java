package com.library.event;

import org.springframework.stereotype.Component;

@Component
public class EventListener {

    @org.springframework.context.event.EventListener
    public void handleBorrowCreated(BorrowCreatedEvent event) {
        System.out.println("LOG [EVENT]: Borrow Record created ID: " + event.getBorrowRecordId() + " for Reader: " + event.getReaderId());
    }

    @org.springframework.context.event.EventListener
    public void handleBookReturned(BookReturnedEvent event) {
        System.out.println("LOG [EVENT]: Book Copy ID: " + event.getBookCopyId() + " returned for Record: " + event.getBorrowRecordId());
    }

    @org.springframework.context.event.EventListener
    public void handleFineIssued(FineIssuedEvent event) {
        System.out.println("LOG [EVENT]: Fine Issued ID: " + event.getFineReceiptId() + " Amount: " + event.getAmount());
    }
}