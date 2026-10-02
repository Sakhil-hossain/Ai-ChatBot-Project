package com.Ai_ChatBot_Backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class AiController {

    @PostMapping
    public String chat(@RequestBody String  message){
        return "You asked : " + message;
    }

}
