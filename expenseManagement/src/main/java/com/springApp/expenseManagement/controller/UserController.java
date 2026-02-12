package com.springApp.expenseManagement.controller;

import com.springApp.expenseManagement.entity.User;
import com.springApp.expenseManagement.service.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;


    @PostMapping
    public ResponseEntity<User> createAccount(@RequestBody User user){
        return ResponseEntity.ok(userService.createUser(user));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserAccount(@PathVariable String userId){
        return ResponseEntity.ok(userService.getUser(userId));
    }



}
