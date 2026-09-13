package com.library.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "Reader")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reader {

    @Id
    @Column(name = "ReaderID", length = 10)
    private String readerId;

    @Column(name = "FullName", nullable = false, length = 100)
    private String fullName;

    @Column(name = "Email", nullable = false, length = 100)
    private String email;

    @Column(name = "Phone", length = 15)
    private String phone;

    @Column(name = "Address", length = 255)
    private String address;

    @Column(name = "Dob")
    private LocalDate dob;

    @Column(name = "Gender", length = 10)
    private String gender;

    @Column(name = "Cccd", length = 20)
    private String cccd;

    @Column(name = "StartDate")
    private LocalDate cardIssueDate;

    @Column(name = "ExpiryDate")
    private LocalDate expiryDate;

    @Column(name = "Status", length = 20)
    private String status;

    @Column(name = "Username", length = 50)
    private String username;

    @Column(name = "Password", length = 100)
    private String password;
}