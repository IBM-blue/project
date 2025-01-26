package com.example.blureserve.service;

import com.example.blureserve.entity.Manager;
import com.example.blureserve.entity.User;
import com.example.blureserve.repository.AuthRepository;
import com.example.blureserve.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {


    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private ManagerRepository managerRepository;


    public String authenticate(String username, String password){
        User user = authRepository.findByUsernameAndPassword(username, password);
        if(user==null){
            return null;
        }

        return jwtService.generateToken(user.getUsername(), user.getId());
    }


    
    public String register(String username, String password, String managerEmail) {
        if (authRepository.findByUsername(username)!=null) {
            return null;
        }

        Manager manager = managerRepository.findByEmail(managerEmail);

        User user = new User();
        user.setUsername(username);
        user.setPassword(password); 
        user.setManagerId(manager.getId());
        User u = authRepository.save(user);

        return jwtService.generateToken(username, u.getId());
        
    }

}
