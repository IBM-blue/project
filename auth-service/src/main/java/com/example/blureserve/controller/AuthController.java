package com.example.blureserve.controller;

import com.example.blureserve.dto.AuthResponse;
import com.example.blureserve.dto.LoginDTO;
import com.example.blureserve.dto.RegisterDTO;
import com.example.blureserve.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO){

        AuthResponse res = authService.authenticate(loginDTO.getUsername(), loginDTO.getPassword());
        if(res==null){
            return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(res, HttpStatus.OK);

    }


    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody RegisterDTO registerDTO) {
        AuthResponse res = authService.register(registerDTO.getUsername(), registerDTO.getPassword(), registerDTO.getManagerEmail());
        if (res==null) {
            return new ResponseEntity<>("Already Registered User", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }



    
}
