package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "BookCopy")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class BookCopy {

    @Id
    @Column(name = "CopyID", length = 10)
    private String copyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BookID", nullable = false)
    private Book book;

    @Column(name = "Barcode", nullable = false, unique = true, length = 50)
    private String barcode;

    @Column(name = "Status", length = 50)
    private String status;

    @Column(name = "Condition", length = 50)
    private String condition;

    @Column(name = "Price", precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;
}