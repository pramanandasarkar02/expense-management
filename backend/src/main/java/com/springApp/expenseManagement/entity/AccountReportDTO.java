package com.springApp.expenseManagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@AllArgsConstructor
@Data
public class AccountReportDTO {
    private String monthId;
    private Map<String, Integer> fields;
}
