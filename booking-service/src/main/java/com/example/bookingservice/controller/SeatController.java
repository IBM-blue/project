package com.example.bookingservice.controller;

import com.example.bookingservice.dto.SeatRequest;
import com.example.bookingservice.entity.Seat;
import com.example.bookingservice.service.JwtService;
import com.example.bookingservice.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/seats")
public class SeatController {

    @Autowired
    private SeatService seatService;




    @GetMapping("")
    public ResponseEntity<?> getSeats(@RequestHeader("Authorization") String header,
                                   @RequestParam String date,
                                   @RequestParam String time){
        if(!seatService.validToken(header)){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(seatService.getSeats(date, time), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> bookSeat(@RequestHeader("Authorization") String header,
                         @RequestBody SeatRequest seatRequest){
        if(!seatService.validToken(header)){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return  new ResponseEntity<>(seatService.bookSeat(seatRequest.getDate(), seatRequest.getTime(), seatRequest.getUserId(), seatRequest.getSeatNo()), HttpStatus.OK);
    }
}
