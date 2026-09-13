package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Reservation")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Reservation {

    @Id
    @Column(name = "ReservationID", length = 10)
    private String reservationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ReaderID", nullable = false)
    private Reader reader;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CopyID", nullable = false)
    private BookCopy bookCopy;

    @Column(name = "ReservationDate")
    private LocalDateTime reservationDate;

    @Column(name = "ExpiryDate", nullable = false)
    private LocalDateTime expiryDate;

    @Column(name = "Status", length = 50)
    private String status;

    @Column(name = "QRCode", length = 255)
    private String qrCode;

    @Column(name = "Note", columnDefinition = "TEXT")
    private String note;
}