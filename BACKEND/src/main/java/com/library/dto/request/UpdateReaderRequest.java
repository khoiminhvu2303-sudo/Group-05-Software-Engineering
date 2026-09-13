package com.library.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateReaderRequest {
    private String fullName;
    private String phone;
    private String email;
    private String address;
    private String gender;
    private LocalDate dob;
    private String cccd;
}
