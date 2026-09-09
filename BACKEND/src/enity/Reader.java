package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "Reader")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Reader {

    @Id
    @Column(name = "ReaderID", length = 10, nullable = false)
    private String readerId;

    @Column(name = "FullName", length = 50, nullable = false)
    private String fullName;

    @Column(name = "DOB")
    private LocalDate dob;

    @Column(name = "Phone", length = 10, unique = true)
    private String phone;

    @Column(name = "Gender", length = 10, nullable = false)
    private String gender;

    @Column(name = "Email", length = 50, unique = true)
    private String email;

    @Column(name = "Address", length = 50)
    private String address;

    @Column(name = "CCCD", length = 12, unique = true)
    private String cccd;

    @Column(name = "StartDate", nullable = false)
    private LocalDate startDate;

    @Column(name = "ExpiryDate", nullable = false)
    private LocalDate expiryDate;

    @Column(name = "Username", length = 50, nullable = false, unique = true)
    private String username;

    @Column(name = "Password", length = 50, nullable = false)
    private String password;

    @Column(name = "Status", length = 50, nullable = false)
    @Builder.Default
    private String status = "Active";
}