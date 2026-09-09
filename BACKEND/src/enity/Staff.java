package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "Staff")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Staff {

    @Id
    @Column(name = "StaffID", length = 10)
    private String staffId;

    @Column(name = "StaffName", nullable = false, length = 50)
    private String staffName;

    @Column(name = "Gender", length = 10)
    private String gender;

    @Column(name = "Birthday_Staff")
    private LocalDate birthdayStaff;

    @Column(name = "Numberphone", length = 10)
    private String numberphone;

    @Column(name = "Email", unique = true, length = 50)
    private String email;

    @Column(name = "Address", length = 50)
    private String address;

    @Column(name = "CCCD", unique = true, length = 12)
    private String cccd;

    @Column(name = "Salary")
    private Double salary;

    @Column(name = "NameLogin_Staff", nullable = false, unique = true, length = 50)
    private String nameLoginStaff;

    @Column(name = "Password_Staff", nullable = false, length = 50)
    private String passwordStaff;

    @Column(name = "Status", length = 50)
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ManagedByAdminID")
    private Admin managedByAdmin;
}