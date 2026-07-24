package com.example.emailwriter.controller;

import com.example.emailwriter.dto.EmailRequest;
import com.example.emailwriter.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
        String generatedResponse = emailService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(generatedResponse);
    }
}