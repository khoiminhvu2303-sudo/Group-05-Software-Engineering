package com.library.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Publisher")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Publisher {

    @Id
    @Column(name = "PublisherID", length = 10, nullable = false)
    private String publisherId;

    @Column(name = "Name", length = 50, nullable = false, unique = true)
    private String name;

    @Column(name = "Address", length = 50, unique = true)
    private String address;

    @Column(name = "Phone", length = 10, unique = true)
    private String phone;

    @Column(name = "Email", length = 50, unique = true)
    private String email;

    @Column(name = "Website", length = 50, unique = true)
    private String website;
}