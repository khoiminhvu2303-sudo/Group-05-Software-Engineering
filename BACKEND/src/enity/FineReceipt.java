package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "FineReceipt")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class FineReceipt {

    @Id
    @Column(name = "FineID", length = 10)
    private String fineId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transactionID", nullable = false)
    private BorrowRecord borrowRecord;

    @Column(name = "Note", length = 255)
    private String note;

    @Column(name = "Amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(name = "PaymentStatus", length = 50)
    private String paymentStatus;
}