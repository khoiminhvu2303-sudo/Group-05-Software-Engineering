package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "BorrowRecord")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BorrowRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BorrowID")
    private Integer borrowId;

    @Column(name = "ReaderID", nullable = false)
    private Integer readerId;

    @Column(name = "StaffID", nullable = false)
    private Integer staffId;

    @Column(name = "BorrowDate", insertable = false, updatable = false)
    private LocalDateTime borrowDate;

    @Column(name = "Status", length = 50)
    private String status;
}