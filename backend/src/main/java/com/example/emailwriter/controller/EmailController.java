package com.example.emailwriter.controller;

import com.example.emailwriter.dto.EmailRequest;
import com.example.emailwriter.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody(required = false) EmailRequest emailRequest) {
        if (emailRequest == null || emailRequest.getPrompt() == null || emailRequest.getPrompt().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Prompt is required.");
        }
        try {
            String generatedResponse = emailService.generateEmailReply(emailRequest);
            return ResponseEntity.ok(generatedResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error generating email: " + e.getMessage());
        }
    }
}
