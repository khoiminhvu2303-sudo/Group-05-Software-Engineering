package com.library.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "BorrowDetail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BorrowDetail {

    @Id
    @Column(name = "BorrowDetailID", length = 50)
    private String borrowDetailId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BorrowID", nullable = false)
    private BorrowRecord borrowRecord;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CopyID", nullable = false)
    private BookCopy bookCopy;

    @Column(name = "DueDate", nullable = false)
    private LocalDate dueDate;

    @Column(name = "DateIssued")
    private LocalDate dateIssued;

    @Column(name = "ActualReturnDate")
    private LocalDate actualReturnDate;

    @Column(name = "RenewalCount")
    private Integer renewalCount;

    @Column(name = "ReturnCondition", length = 50)
    private String returnCondition;

    @Column(name = "Status", length = 50)
    private String status;
}