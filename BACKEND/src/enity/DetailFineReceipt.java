package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "DetailFineReceipt")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetailFineReceipt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FineID")
    private Integer fineId;

    @Column(name = "BorrowDetailID", nullable = false, unique = true)
    private Integer borrowDetailId;

    @Column(name = "StaffID")
    private Integer staffId;

    @Column(name = "Reason", length = 255, nullable = false)
    private String reason;

    @Column(name = "Amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal amount;

    @Column(name = "IssuedDate", insertable = false, updatable = false)
    private LocalDateTime issuedDate;

    @Column(name = "PaidDate")
    private LocalDateTime paidDate;

    @Column(name = "Status", length = 50)
    private String status;
}