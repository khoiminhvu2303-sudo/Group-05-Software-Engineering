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
public class VerifyReaderResponse {

    private String readerId;
    private String fullName;
    private String cardCode;
    private boolean isValid;
    private LocalDate expiryDate;
    private String status;
    private String qrCodeUrl;
    private String message;
}
