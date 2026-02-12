package com.springApp.expenseManagement.service.impl;

import com.springApp.expenseManagement.entity.User;
import com.springApp.expenseManagement.repository.UserRepository;
import com.springApp.expenseManagement.service.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;


    @Override
    public User getUser(String userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }
}
