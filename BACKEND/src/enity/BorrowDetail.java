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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BorrowDetailID")
    private Integer borrowDetailId;

    @Column(name = "BorrowID", nullable = false)
    private Integer borrowId;

    @Column(name = "CopyID", nullable = false)
    private Integer copyId;

    @Column(name = "DueDate", nullable = false)
    private LocalDate dueDate;

    @Column(name = "ActualReturnDate")
    private LocalDate actualReturnDate;

    @Column(name = "RenewalCount")
    private Integer renewalCount;

    @Column(name = "ReturnCondition", length = 50)
    private String returnCondition;

    @Column(name = "Status", length = 50)
    private String status;
}