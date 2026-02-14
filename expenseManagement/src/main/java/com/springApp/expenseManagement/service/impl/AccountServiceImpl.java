package com.springApp.expenseManagement.service.impl;

import com.springApp.expenseManagement.entity.*;
import com.springApp.expenseManagement.repository.AccountActivityRepository;
import com.springApp.expenseManagement.repository.AccountRepository;
import com.springApp.expenseManagement.repository.UserRepository;
import com.springApp.expenseManagement.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountActivityRepository accountActivityRepository;
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    @Override
    public List<String> getActiveMonthList(String userId) {
        System.out.println("UserId " + userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        LocalDateTime createdAt = user.getCreatedAt();
        // list down every month from the creation date to today

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
    public List<AccountActivity> getMonthlyAccountActivity(String monthId, String accountId) {
        System.out.println("calling account activity");
        List<AccountActivity> activities = accountActivityRepository.getMonthlyActivity(monthId, accountId);
        for (var activity : activities) {
            System.out.println(activity.toString());
        }
        System.out.println("length of account activity: " + activities.size());

        return activities;
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

    public List<AccountReportDTO> getReports(String accountId) {
        List<AccountReport> reports = accountActivityRepository.getReport(accountId);

        System.out.println(reports);
        return reports.stream().map(r -> {
            Map<String, Integer> map;
            try {
                map = objectMapper.readValue(r.getFields(), new TypeReference<Map<String, Integer>>() {
                });
            } catch (Exception e) {
                map = Map.of();
            }

            return new AccountReportDTO(r.getMonthId(), map);
        }).toList();
    }

    @Override
    public Double getTotalAmount(String amountId) {
        Double res = accountActivityRepository.getTotalAmount(amountId);
        System.out.println("Total amount " + res);
        return res;
    }
}
