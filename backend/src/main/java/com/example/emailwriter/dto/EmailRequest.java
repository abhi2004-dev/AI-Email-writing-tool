package com.example.emailwriter.dto;

import lombok.Data;

@Data
public class EmailRequest {
    private String prompt;
    private String tone;
    private String length;
}