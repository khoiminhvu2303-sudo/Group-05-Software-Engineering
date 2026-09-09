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
public class ReservationResponseDTO {

    private String reservationId;
    private String readerId;
    private String readerName;
    private String copyId;
    private String bookTitle;
    private LocalDateTime reservationDate;
    private LocalDateTime expiryDate;
    private String status;
    private String qrCode;
    private String note;
}
