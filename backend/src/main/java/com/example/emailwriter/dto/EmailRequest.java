package com.example.emailwriter.dto;

public class EmailRequest {
    private String prompt;
    private String tone;
    private String length;

    public EmailRequest() {
    }

    public EmailRequest(String prompt, String tone, String length) {
        this.prompt = prompt;
        this.tone = tone;
        this.length = length;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getTone() {
        return tone;
    }

    public void setTone(String tone) {
        this.tone = tone;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    @Override
    public String toString() {
        return "EmailRequest{" +
                "prompt='" + prompt + '\'' +
                ", tone='" + tone + '\'' +
                ", length='" + length + '\'' +
                '}';
    }
}
