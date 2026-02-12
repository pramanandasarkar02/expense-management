package com.springApp.expenseManagement.repository;

import com.springApp.expenseManagement.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface AccountRepository extends JpaRepository<Account, String> {



    @Query(
            value = "SELECT * FROM accounts WHERE user_id = ?1",
            nativeQuery = true
    )
    Account getAccountByUserId(String userId);
}
