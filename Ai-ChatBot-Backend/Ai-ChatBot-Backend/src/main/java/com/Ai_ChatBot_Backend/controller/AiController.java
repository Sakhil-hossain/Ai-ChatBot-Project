package com.Ai_ChatBot_Backend.controller;

import com.Ai_ChatBot_Backend.dto.RequestDto;
import com.Ai_ChatBot_Backend.dto.ResponseDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class AiController {

    @PostMapping
    public ResponseDto chat(@RequestBody RequestDto request){

        String reply = "you asked: "+ request.getMessage();

        return new ResponseDto(reply);
    }

}
