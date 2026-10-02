package com.Ai_ChatBot_Backend.service;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor

@Service
public class ChatService {

    private final RestClient geminiRestClient;

    @Value("${gemini.api.model}")
    private String model;

    public String getResponse(String message) {

        try {

            // 1. Create request for Gemini
            Map<String, Object> body = Map.of(
                    "contents", List.of(
                            Map.of("parts", List.of(
                                    Map.of("text", message)
                            ))
                    )
            );

            // 2. Send request to Gemini
            Map response = geminiRestClient.post()
                    .uri("/v1beta/models/" + model + ":generateContent")
                    .body(body)
                    .retrieve()
                    .body(Map.class);

            // 3. Get AI answer
            List candidates = (List) response.get("candidates");
            Map candidate = (Map) candidates.get(0);
            Map content = (Map) candidate.get("content");
            List parts = (List) content.get("parts");
            Map part = (Map) parts.get(0);

            return part.get("text").toString();

        }
        catch (Exception e) {

            return "Sorry, I am unable to generate a response right now.";
        }
    }
}
