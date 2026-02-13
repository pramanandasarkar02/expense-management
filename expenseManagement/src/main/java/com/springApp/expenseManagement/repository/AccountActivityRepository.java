package com.springApp.expenseManagement.repository;

import com.springApp.expenseManagement.entity.AccountActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AccountActivityRepository extends JpaRepository<AccountActivity, String> {

    @Query("""
        SELECT DISTINCT a.monthId
        FROM AccountActivity a
        WHERE a.accountId IN (
            SELECT ac.id
            FROM Account ac
            WHERE ac.userId = ?1
        )
    """)
    List<String> getMonthListByUserId(String userId);

    @Query("""
        SELECT a
        FROM AccountActivity a
        WHERE a.monthId = ?1
          AND a.accountId = ?2
    """)
    List<AccountActivity>getMonthlyActivity(String monthId, String accountId);

}
