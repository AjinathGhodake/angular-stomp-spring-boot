package com.websocket.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate template;

    @Autowired
    WebSocketController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/send/message")
    public void sendMessage(String message) {
        System.out.println(message);
        this.template.convertAndSend("/message", message);
    }

    @MessageMapping("/send/hello")
    @SendToUser("/queue")
    public String sendMessageToUser(@Payload String message, Principal user) {
        System.out.println(message);
        return message;
    }

}