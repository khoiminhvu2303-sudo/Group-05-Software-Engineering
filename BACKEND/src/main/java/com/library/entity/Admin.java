package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "Admin")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Admin {

    @Id
    @Column(name = "AdminID", length = 10)
    private String adminId;

    @Column(name = "AdminName", nullable = false, length = 50)
    private String adminName;

    @Column(name = "Gender", length = 10)
    private String gender;

    @Column(name = "Email", unique = true, length = 50)
    private String email;

    @Column(name = "Phone", length = 10)
    private String phone;

    @Column(name = "CCCD", unique = true, length = 12)
    private String cccd;

    @Column(name = "Salary", precision = 12, scale = 2)
    private BigDecimal salary;

    @Column(name = "NameLogin_Admin", nullable = false, unique = true, length = 50)
    private String nameLoginAdmin;

    @Column(name = "Password_Admin", nullable = false, length = 50)
    private String passwordAdmin;
}