package com.example.bookingservice.service;

import com.example.bookingservice.entity.Manager;
import com.example.bookingservice.entity.Seat;
import com.example.bookingservice.entity.User;
import com.example.bookingservice.repository.ManagerRepository;
import com.example.bookingservice.repository.SeatRepository;
import com.example.bookingservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;


    public List<Integer> getSeats(String date, String time){
        List<Integer> res = seatRepository.findByDateAndTime(date, time);
        return res;
    }


    public Seat bookSeat(String date, String time, long userId, int seatNo){
        Seat s =  seatRepository.save(new Seat(date, time, userId, seatNo));
        deductChips(s.getUserId());
        return s;
    }

    public boolean deductChips(long userId){
        User u = userRepository.findById(userId).get();
        Manager m = managerRepository.findById(u.getManagerId()).get();
        if(m.getCredit()<50) return false;
        m.setCredit(m.getCredit()-50);
        managerRepository.save(m);
        return true;
    }

    public boolean validToken(String header){
        String token=null;
        if(header.startsWith("Bearer")){
            token = header.substring(7);
        } else {
            return false;
        }

        return jwtService.validateToken(token);
    }

    public int getManagerCoins(long userId) {
        User u = userRepository.findById(userId).get();
        Manager m = managerRepository.findById(u.getManagerId()).get();
        return m.getCredit();
    }
}
