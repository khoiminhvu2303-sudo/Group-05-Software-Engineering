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
public class StaffResponseDTO {

    private String staffId;
    private String staffName;
    private String gender;
    private LocalDate birthday;
    private String phone;
    private String email;
    private String address;
    private String cccd;
    private Double salary;
    private String nameLogin;
    private String status;
    private String managedByAdminId;
}
