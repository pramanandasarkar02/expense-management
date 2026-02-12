package com.springApp.expenseManagement.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "account_activity")
@Data
public class AccountActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String accountId;

    private TransactionType transactiontype;

    private String monthId;

    private ExpenseTag expenseTag;
}
