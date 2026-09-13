package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "FineReceipt")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FineReceipt {

    @Id
    @Column(name = "FineID", length = 50)
    private String fineID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BorrowID")
    private BorrowRecord borrowRecord;

    @Column(name = "Amount")
    private BigDecimal amount;

    @Column(name = "Describe", length = 255)
    private String describe;

    @Column(name = "PaymentStatus", length = 20)
    private String paymentStatus;
}