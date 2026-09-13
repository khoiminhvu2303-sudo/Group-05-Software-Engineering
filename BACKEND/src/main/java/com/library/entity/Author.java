package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "Author")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Author {

    @Id
    @Column(name = "AuthorID", length = 10)
    private String authorId;

    @Column(name = "AuthorName", nullable = false, length = 50)
    private String authorName;

    @Column(name = "Note", columnDefinition = "TEXT")
    private String note;

    @Column(name = "Birthday")
    private LocalDate birthday;

    @Column(name = "Deathday")
    private LocalDate deathday;
}