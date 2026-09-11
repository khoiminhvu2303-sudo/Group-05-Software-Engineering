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
public class ReaderResponse {

    private Long id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String cardCode;
    private LocalDate expiryDate;
    private String status;
}
