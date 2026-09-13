package com.library.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "BorrowRecord")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BorrowRecord {

    @Id
    @Column(name = "TransactionID", length = 50)
    private String transactionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ReaderID")
    private Reader reader;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "StaffID")
    private Staff staff;

    @Column(name = "DateBorrow")
    private LocalDate dateBorrow;

    @Column(name = "DueDate")
    private LocalDate dueDate;

    @Column(name = "Status", length = 50)
    private String status;
}