package com.library.repository;

import com.library.entity.Reader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReaderRepository extends JpaRepository<Reader, String> {

    Optional<Reader> findByUsername(String username);
    Optional<Reader> findByEmail(String email);
    Optional<Reader> findByPhone(String phone);
    Optional<Reader> findByCccd(String cccd);

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    boolean existsByCccd(String cccd);

    List<Reader> findByStatus(String status);

    @Query("SELECT r FROM Reader r WHERE r.expiryDate < :date AND r.status = 'Active'")
    List<Reader> findExpiredReaders(@Param("date") LocalDate date);

    @Query("SELECT r FROM Reader r WHERE r.expiryDate BETWEEN :startDate AND :endDate")
    List<Reader> findReadersExpiringBetween(@Param("startDate") LocalDate startDate, 
                                            @Param("endDate") LocalDate endDate);
}
