package com.example.emailwriter.service;

import com.example.emailwriter.dto.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class EmailService {

    private final WebClient webClient;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    public EmailService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String generateEmailReply(EmailRequest emailRequest) {
        // Construct the prompt instructions based on tone and length
        String prompt = buildPrompt(emailRequest);

        // Craft the request structure matching Gemini API specifications
        Map<String, Object> requestBody = Map.of(
            "contents", new Object[] {
                Map.of("parts", new Object[] {
                    Map.of("text", prompt)
                })
            }
        );

        // Make the HTTP POST call using WebClient
        String responseBody = webClient.post()
                .uri(geminiApiUrl)
                .header("x-goog-api-key", geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // Extract the generated text from response JSON
        return extractResponseContent(responseBody);
    }

    private String buildPrompt(EmailRequest request) {
        StringBuilder promptBuilder = new StringBuilder();
        promptBuilder.append("Generate a professional email reply for the following prompt: ")
                     .append(request.getPrompt())
                     .append(". ");
        if (request.getTone() != null && !request.getTone().isEmpty()) {
            promptBuilder.append("Use a ").append(request.getTone()).append(" tone. ");
        }
        if (request.getLength() != null && !request.getLength().isEmpty()) {
            promptBuilder.append("Make the length ").append(request.getLength()).append(". ");
        }
        return promptBuilder.toString();
    }

    private String extractResponseContent(String responseJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(responseJson);
            return rootNode.path("candidates")
                    .path(0)
                    .path("content")
                    .path("parts")
                    .path(0)
                    .path("text")
                    .asText();
        } catch (Exception e) {
            throw new RuntimeException("Error parsing Gemini API response", e);
        }
    }
}