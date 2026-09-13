package com.library.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateStaffDTO {

    @NotBlank(message = "Staff name is required")
    private String staffName;

    private String gender;

    private LocalDate birthday;

    private String phone;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String address;

    @NotBlank(message = "CCCD is required")
    private String cccd;

    private Double salary;

    @NotBlank(message = "Username is required")
    private String nameLogin;

    @NotBlank(message = "Password is required")
    private String password;

    private String adminId;
}
