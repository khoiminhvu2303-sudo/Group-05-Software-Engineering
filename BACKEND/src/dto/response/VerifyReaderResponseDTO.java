package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VerifyReaderResponseDTO {

    private String readerId;
    private String fullName;
    private String cccd;
    private String email;
    private String status;           // ACTIVE, EXPIRED, LOCKED
    private boolean isValid;         // True if eligible to borrow books
    private LocalDate expiryDate;
    private String verificationNote; // Reason explanation if card is invalid
}
