package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponse {

    private String id;
    private String bookId;
    private String bookTitle;
    private Long readerId;
    private String readerName;
    private LocalDateTime reservationDate;
    private LocalDateTime expiryDate;
    private String status; // e.g., PENDING, READY_FOR_PICKUP, COMPLETED, CANCELLED, EXPIRED
    private Integer queuePosition;
}
