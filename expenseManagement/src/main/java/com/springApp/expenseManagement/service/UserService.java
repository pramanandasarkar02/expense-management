package com.springApp.expenseManagement.service;

import com.springApp.expenseManagement.entity.User;

public interface UserService {
    public User getUser(String userId);
    public User createUser(User user);
}
