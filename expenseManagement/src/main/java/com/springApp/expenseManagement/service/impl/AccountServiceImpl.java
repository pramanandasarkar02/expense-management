package com.springApp.expenseManagement.service.impl;

import com.springApp.expenseManagement.entity.Account;
import com.springApp.expenseManagement.entity.AccountActivity;
import com.springApp.expenseManagement.entity.User;
import com.springApp.expenseManagement.repository.AccountActivityRepository;
import com.springApp.expenseManagement.repository.AccountRepository;
import com.springApp.expenseManagement.repository.UserRepository;
import com.springApp.expenseManagement.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountActivityRepository accountActivityRepository;
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    @Override
    public List<String> getActiveMonthList(String userId) {
        System.out.println("UserId "+ userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        LocalDateTime createdAt = user.getCreatedAt();
//        list down every month from the creation date to today

        return getMonthsFromCreation(createdAt);
    }

    private static List<String> getMonthsFromCreation(LocalDateTime createdAt) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM yyyy");
        List<String> result = new ArrayList<>();

        YearMonth start = YearMonth.from(createdAt);
        YearMonth end = YearMonth.from(LocalDateTime.now());

        while (!start.isAfter(end)) {
            result.add(start.format(formatter));
            start = start.plusMonths(1);
        }

        return result;
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
        Account account = new Account();
        account.setUserId(userId);
        return accountRepository.save(account);
    }

    @Override
    public Account getAccount(String userId) {
        return accountRepository.getAccountByUserId(userId);
    }
}
