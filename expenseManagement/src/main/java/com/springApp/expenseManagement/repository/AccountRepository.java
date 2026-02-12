package com.springApp.expenseManagement.repository;

import com.springApp.expenseManagement.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface AccountRepository extends JpaRepository<Account, String> {

    @Query(
            value = "INSERT INTO accounts (user_id) VALUES (?1)",
            nativeQuery = true
    )
    Account createAccount(String userId);

    @Query(
            value = "SELECT * FROM accounts WHERE user_id = ?1",
            nativeQuery = true
    )
    Account getAccountByUserId(String userId);
}
