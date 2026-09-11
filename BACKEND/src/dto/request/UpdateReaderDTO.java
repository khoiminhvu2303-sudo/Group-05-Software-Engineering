package com.library.dto.request;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateReaderDTO {

    private String fullName;
    private LocalDate dob;
    private String phone;
    private String gender;

    @Email(message = "Invalid email format")
    private String email;

    private String address;
    private String cccd;
}
