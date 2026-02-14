package com.springApp.expenseManagement.repository;

import com.springApp.expenseManagement.entity.AccountActivity;
import com.springApp.expenseManagement.entity.AccountReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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


    @Query(
            value = """
        SELECT 
            month_id AS monthId,
            JSON_OBJECTAGG(expense_tag, amount_sum) AS fields
        FROM (
            SELECT 
                month_id,
                expense_tag,
                SUM(amount) AS amount_sum
            FROM account_activity
            WHERE account_id = :accountId
            GROUP BY month_id, expense_tag
        ) AS sub
        GROUP BY month_id
        """,
            nativeQuery = true
    )
    List<AccountReport> getReport(@Param("accountId") String accountId);


    @Query(
            value = """
        SELECT COALESCE(SUM(amount), 0)
        FROM account_activity
        WHERE amount_id = :amountId
        """,
            nativeQuery = true
    )
    Double getTotalAmount(@Param("amountId") String amountId);

}
