package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "Book")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Book {

    @Id
    @Column(name = "BookID", length = 10)
    private String bookId;

    @Column(name = "Title", nullable = false, length = 50)
    private String title;

    @Column(name = "Describe", columnDefinition = "TEXT")
    private String describe;

    @Column(name = "Publication")
    private LocalDate publication;

    @Column(name = "Stockquantity")
    private Integer stockquantity;

    @Column(name = "Status", length = 50)
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AuthorID", nullable = false)
    private Author author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PublisherID", nullable = false)
    private Publisher publisher;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CategoryID", nullable = false)
    private Category category;
}