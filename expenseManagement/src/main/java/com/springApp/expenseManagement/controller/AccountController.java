package com.springApp.expenseManagement.controller;


import ch.qos.logback.core.pattern.util.RegularEscapeUtil;
import com.springApp.expenseManagement.entity.Account;
import com.springApp.expenseManagement.entity.AccountActivity;
import com.springApp.expenseManagement.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody String userId){
        return ResponseEntity.ok(accountService.createAccount(userId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Account> getAccount(@PathVariable String userId){
        return ResponseEntity.ok(accountService.getAccount(userId));
    }


    @GetMapping("/{userId}/months")
    public ResponseEntity<List<String>> getActivityMonthList(@PathVariable String userId){
        return ResponseEntity.ok(accountService.getActiveMonthList(userId));
    }

    @GetMapping("/activities/{accountId}/months/{monthId}")
    public ResponseEntity<List<AccountActivity>> getMonthlyAccountActivity(@PathVariable String accountId, @PathVariable String monthId){
        return ResponseEntity.ok(accountService.getMonthlyAccountActivity(monthId, accountId));
    }

    @PostMapping("/activities")
    public ResponseEntity<AccountActivity> getAccountActivity(@RequestBody AccountActivity accountActivity){
        return ResponseEntity.ok(accountService.addAccountActivity(accountActivity));
    }

    @PutMapping("/activities")
    public ResponseEntity<AccountActivity> modifyAccountActivity(@RequestBody AccountActivity accountActivity){
        return ResponseEntity.ok(accountService.modifyAccountActivity(accountActivity));
    }
}
