package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Auditlog")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Auditlog {

    @Id
    @Column(name = "LogID", length = 10)
    private String logId;

    @Column(name = "UserID", nullable = false, length = 10)
    private String userId;

    @Column(name = "UserRole", nullable = false, length = 20)
    private String userRole;

    @Column(name = "Action", nullable = false, length = 50)
    private String action;

    @Column(name = "TableName", length = 50)
    private String tableName;

    @Column(name = "Description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;
}