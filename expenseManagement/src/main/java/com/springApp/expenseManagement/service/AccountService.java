package com.springApp.expenseManagement.service;

import com.springApp.expenseManagement.entity.Account;
import com.springApp.expenseManagement.entity.AccountActivity;
import com.springApp.expenseManagement.entity.AccountReport;
import com.springApp.expenseManagement.entity.AccountReportDTO;

import java.util.List;

public interface AccountService {
    List<String> getActiveMonthList(String userId);

    List<AccountActivity> getMonthlyAccountActivity(String monthId, String userId);

    AccountActivity addAccountActivity(AccountActivity accountActivity);

    AccountActivity modifyAccountActivity(AccountActivity accountActivity);

    Account createAccount(String userId);

    Account getAccount(String userId);

    List<AccountReportDTO> getReports(String accountId);

    Double getTotalAmount(String amountId);
}
