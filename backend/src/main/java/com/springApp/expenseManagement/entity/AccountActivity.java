package com.springApp.expenseManagement.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "account_activity")
@Data
public class AccountActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String accountId;

    private String title;

    private String transactionType;

    private String monthId;

    private Double amount;

    private String expenseTag;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

}
