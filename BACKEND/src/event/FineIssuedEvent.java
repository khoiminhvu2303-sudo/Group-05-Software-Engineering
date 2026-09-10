package com.library.event;

import java.math.BigDecimal;

public class FineIssuedEvent {
    private final Long fineReceiptId;
    private final Long readerId;
    private final BigDecimal amount;

    public FineIssuedEvent(Long fineReceiptId, Long readerId, BigDecimal amount) {
        this.fineReceiptId = fineReceiptId;
        this.readerId = readerId;
        this.amount = amount;
    }

    public Long getFineReceiptId() { return fineReceiptId; }
    public Long getReaderId() { return readerId; }
    public BigDecimal getAmount() { return amount; }
}