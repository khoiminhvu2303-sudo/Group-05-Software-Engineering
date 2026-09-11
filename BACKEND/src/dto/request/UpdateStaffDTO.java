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
public class UpdateStaffDTO {

    private String staffName;
    private String gender;
    private LocalDate birthday;
    private String phone;

    @Email(message = "Invalid email format")
    private String email;

    private String address;
    private String cccd;
    private Double salary;
    private String status;
    private String managedByAdminId;
}
