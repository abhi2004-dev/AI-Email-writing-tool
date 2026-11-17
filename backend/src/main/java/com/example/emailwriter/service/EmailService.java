package com.example.emailwriter.service;

import com.example.emailwriter.dto.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.Map;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

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

        try {
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
        } catch (WebClientResponseException e) {
            log.error("Gemini API returned error status {}: {}", e.getStatusCode(), e.getResponseBodyAsString());
            throw new RuntimeException("Gemini API error (" + e.getStatusCode() + "): " + e.getResponseBodyAsString(), e);
        } catch (Exception e) {
            log.error("Error communicating with Gemini API", e);
            throw new RuntimeException("Failed to generate email via Gemini API: " + e.getMessage(), e);
        }
    }

    private String buildPrompt(EmailRequest request) {
        StringBuilder promptBuilder = new StringBuilder();
        promptBuilder.append("You are an expert AI email writer assistant. Generate a high quality, contextually appropriate email based on the following instruction: ")
                     .append(request.getPrompt() != null ? request.getPrompt().trim() : "")
                     .append(". ");
        if (request.getTone() != null && !request.getTone().trim().isEmpty()) {
            promptBuilder.append("Use a ").append(request.getTone().trim()).append(" tone. ");
        }
        if (request.getLength() != null && !request.getLength().trim().isEmpty()) {
            promptBuilder.append("Make the length ").append(request.getLength().trim()).append(". ");
        }
        promptBuilder.append("Provide a suitable subject line and clean email body. Return only the email content.");
        return promptBuilder.toString();
    }

    private String extractResponseContent(String responseJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(responseJson);
            JsonNode candidates = rootNode.path("candidates");
            if (candidates.isArray() && candidates.size() > 0) {
                JsonNode parts = candidates.get(0).path("content").path("parts");
                if (parts.isArray() && parts.size() > 0) {
                    return parts.get(0).path("text").asText();
                }
            }
            JsonNode errorNode = rootNode.path("error");
            if (!errorNode.isMissingNode()) {
                String errorMsg = errorNode.path("message").asText("Gemini API error");
                throw new RuntimeException(errorMsg);
            }
            return "No content generated. Please try again with different parameters.";
        } catch (Exception e) {
            log.error("Error parsing Gemini API response", e);
            throw new RuntimeException("Error parsing Gemini API response: " + e.getMessage(), e);
        }
    }
}
