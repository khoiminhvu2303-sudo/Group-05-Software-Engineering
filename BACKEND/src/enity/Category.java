package com.library.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Category")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Category {

    @Id
    @Column(name = "CategoryID", length = 10, nullable = false)
    private String categoryId;

    @Column(name = "CategoryName", length = 50, nullable = false)
    private String categoryName;

    @Column(name = "BookID", length = 10)
    private String bookId;
}