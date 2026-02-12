package com.springApp.expenseManagement.controller;

import com.springApp.expenseManagement.entity.User;
import com.springApp.expenseManagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private UserService userService;


    @PostMapping
    public ResponseEntity<User> createAccount(@RequestBody User user){
        return ResponseEntity.ok(userService.createUser(user));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserAccount(@PathVariable String userId){
        return ResponseEntity.ok(userService.getUser(userId));
    }



}
