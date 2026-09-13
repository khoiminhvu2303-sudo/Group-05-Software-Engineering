package com.library.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Staff")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Staff {

    @Id
    @Column(name = "StaffID", length = 10)
    private String staffId;

    @Column(name = "StaffName", nullable = false, length = 50)
    private String fullName;

    @Column(name = "Email", length = 50)
    private String email;

    @Column(name = "Numberphone", length = 10)
    private String phoneNumber;

    @Transient
    private String role;

    @Column(name = "Status", length = 20)
    private String status;

    @Column(name = "NameLogin_Staff", length = 50)
    private String nameLoginStaff;

    @Column(name = "Password_Staff", length = 255)
    private String passwordStaff;
}