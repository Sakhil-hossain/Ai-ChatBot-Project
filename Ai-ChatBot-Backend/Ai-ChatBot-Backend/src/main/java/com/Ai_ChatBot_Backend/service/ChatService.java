package com.Ai_ChatBot_Backend.service;

import org.springframework.stereotype.Service;

@Service
public class ChatService {

    public String getResponse(String message){

        return "you asked: "+ message;
    }
}
