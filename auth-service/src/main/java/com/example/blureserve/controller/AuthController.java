package com.example.blureserve.controller;

import com.example.blureserve.dto.LoginDTO;
import com.example.blureserve.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public String login(@RequestBody LoginDTO loginDTO){

        String token = authService.authenticate(loginDTO.getUsername(), loginDTO.getPassword());
        if(token==null){
            return "User Not Found";
        }

        return token;

    }


    @PostMapping("/signup")
    public String signup(@RequestBody RegisterDTO registerDTO) {
        boolean isRegistered = authService.register(registerDTO.getUsername(), registerDTO.getPassword());
        if (!isRegistered) {
            return "Registration Failed";
        }
        return "User Registered Successfully";
    }



    
}
