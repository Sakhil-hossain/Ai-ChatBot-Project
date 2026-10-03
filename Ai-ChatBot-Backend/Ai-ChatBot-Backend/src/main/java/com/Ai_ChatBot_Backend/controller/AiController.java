package com.Ai_ChatBot_Backend.controller;

import com.Ai_ChatBot_Backend.dto.RequestDto;
import com.Ai_ChatBot_Backend.dto.ResponseDto;
import com.Ai_ChatBot_Backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chat")
public class AiController {

    private final ChatService chatService;

    @PostMapping
    public ResponseDto chat(@RequestBody RequestDto request){

        String reply = chatService.getResponse(request.getMessage());

        return new ResponseDto(reply);
    }

}
