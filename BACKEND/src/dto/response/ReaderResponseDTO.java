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
public class ReaderResponseDTO {

    private String readerId;
    private String fullName;
    private LocalDate dob;
    private String phone;
    private String gender;
    private String email;
    private String address;
    private String cccd;
    private LocalDate startDate;
    private LocalDate expiryDate;
    private String username;
    private String status;
}
