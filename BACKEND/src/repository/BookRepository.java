package com.library.repository;

import com.library.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, String> {

    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByStatus(String status);
    boolean existsByTitle(String title);

    @Query("SELECT b FROM Book b WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(b.author.authorName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(b.category.categoryName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Book> searchBooks(@Param("keyword") String keyword);

    @Query("SELECT b FROM Book b JOIN b.category c WHERE c.categoryName = :categoryName")
    List<Book> findByCategoryName(@Param("categoryName") String categoryName);

    @Query("SELECT b FROM Book b JOIN b.author a WHERE a.authorName = :authorName")
    List<Book> findByAuthorName(@Param("authorName") String authorName);
}
