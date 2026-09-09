package com.library.repository;

import com.library.entity.BookCopy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookCopyRepository extends JpaRepository<BookCopy, String> {

    Optional<BookCopy> findByBarcode(String barcode);
    boolean existsByBarcode(String barcode);
    List<BookCopy> findByStatus(String status);

    List<BookCopy> findByBook_BookID(String bookID);
    List<BookCopy> findByBook_BookIDAndStatus(String bookID, String status);

    Long countByBook_BookIDAndStatusIn(String bookID, List<String> statuses);

    @Query("SELECT bc FROM BookCopy bc WHERE bc.book.bookID = :bookID AND bc.status = 'Available'")
    List<BookCopy> findAvailableCopiesByBookId(@Param("bookID") String bookID);

    @Query("SELECT COUNT(bc) FROM BookCopy bc WHERE bc.book.bookID = :bookID AND bc.status = 'Available'")
    Long countAvailableCopiesByBookId(@Param("bookID") String bookID);
}
