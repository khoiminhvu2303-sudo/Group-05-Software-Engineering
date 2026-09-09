package com.library.repository;

import com.library.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, String> {
    Optional<Staff> findByNameLoginStaff(String nameLoginStaff);
    Optional<Staff> findByEmail(String email);
    boolean existsByNameLoginStaff(String nameLoginStaff);
    List<Staff> findByStatus(String status);
}
