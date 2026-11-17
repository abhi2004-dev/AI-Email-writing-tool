package com.example.emailwriter;

import com.example.emailwriter.dto.EmailRequest;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EmailWriterApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    void testEmailRequestDto() {
        EmailRequest request = new EmailRequest("Test prompt", "Professional", "Short");
        assertEquals("Test prompt", request.getPrompt());
        assertEquals("Professional", request.getTone());
        assertEquals("Short", request.getLength());

        request.setPrompt("Updated prompt");
        request.setTone("Friendly");
        request.setLength("Medium");
        assertEquals("Updated prompt", request.getPrompt());
        assertEquals("Friendly", request.getTone());
        assertEquals("Medium", request.getLength());
    }
}
