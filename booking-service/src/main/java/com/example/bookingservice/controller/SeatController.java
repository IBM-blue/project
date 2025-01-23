package com.example.bookingservice.controller;

import com.example.bookingservice.dto.SeatRequest;
import com.example.bookingservice.entity.Seat;
import com.example.bookingservice.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/seats")
public class SeatController {

    @Autowired
    private SeatService seatService;


    @GetMapping("")
    public List<Integer> getSeats(@RequestParam String date, @RequestParam String time){
        return seatService.getSeats(date, time);
    }

    @PostMapping("")
    public Seat bookSeat(@RequestBody SeatRequest seatRequest){
        return seatService.bookSeat(seatRequest.getDate(), seatRequest.getTime(), seatRequest.getUserId(), seatRequest.getSeatNo());
    }
}
