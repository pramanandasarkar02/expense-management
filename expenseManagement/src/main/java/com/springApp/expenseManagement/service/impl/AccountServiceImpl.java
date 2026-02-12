package com.springApp.expenseManagement.service.impl;

import com.springApp.expenseManagement.entity.Account;
import com.springApp.expenseManagement.entity.AccountActivity;
import com.springApp.expenseManagement.repository.AccountActivityRepository;
import com.springApp.expenseManagement.repository.AccountRepository;
import com.springApp.expenseManagement.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private AccountActivityRepository accountActivityRepository;
    private AccountRepository accountRepository;
    @Override
    public List<String> getActiveMonthList(String userId) {
        return accountActivityRepository.getMonthListByUserId(userId);
    }

    @Override
    public List<AccountActivity> getMonthlyAccountActivity(String monthId, String userId) {
        return accountActivityRepository.getMonthlyActivity(monthId, userId);
    }

    @Override
    public AccountActivity addAccountActivity(AccountActivity accountActivity) {
        return accountActivityRepository.save(accountActivity);
    }

    @Override
    public AccountActivity modifyAccountActivity(AccountActivity accountActivity) {
        return accountActivityRepository.save(accountActivity);
    }

    @Override
    public Account createAccount(String userId) {
        return accountRepository.createAccount(userId);
    }

    @Override
    public Account getAccount(String userId) {
        return accountRepository.getAccountByUserId(userId);
    }
}
