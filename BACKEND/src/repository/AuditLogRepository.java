package com.library.repository;

import com.library.entity.Auditlog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<Auditlog, String> {
    List<Auditlog> findByUserIDOrderByCreatedAtDesc(String userID);
    List<Auditlog> findByAction(String action);
    List<Auditlog> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    List<Auditlog> findByUserIDAndActionOrderByCreatedAtDesc(String userID, String action);
}
