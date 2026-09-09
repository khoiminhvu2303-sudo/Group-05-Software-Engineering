package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "WishList")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Wishlist {

    @Id
    @Column(name = "WishListID", length = 10)
    private String wishListId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ReaderID", nullable = false)
    private Reader reader;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BookID", nullable = false)
    private Book book;

    @Column(name = "AddedData")
    private LocalDateTime addedData;

    @Column(name = "Note", columnDefinition = "TEXT")
    private String note;
}