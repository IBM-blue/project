package com.example.blureserve.service;

import com.example.blureserve.entity.User;
import com.example.blureserve.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {


    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private JwtService jwtService;


    public String authenticate(String username, String password){
        User user = authRepository.findByUsernameAndPassword(username, password);
        if(user==null){
            return null;
        }

        return jwtService.generateToken(user.getUsername(), user.getId());
    }

}
