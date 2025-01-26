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
@RequestMapping("/api/v1")
public class SeatController {

    @Autowired
    private SeatService seatService;




    @GetMapping("/seats")
    public ResponseEntity<?> getSeats(@RequestHeader("Authorization") String header,
                                   @RequestParam String date,
                                   @RequestParam String time,
                                      @RequestParam String location){
        if(!seatService.validToken(header)){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(seatService.getSeats(date, time, location), HttpStatus.OK);
    }

    @PostMapping("/seats")
    public ResponseEntity<?> bookSeat(@RequestHeader("Authorization") String header,
                         @RequestBody SeatRequest seatRequest){
        if(!seatService.validToken(header)){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return  new ResponseEntity<>(seatService.bookSeat(seatRequest.getDate(), seatRequest.getTime(), seatRequest.getUserId(), seatRequest.getSeatNo(), seatRequest.getLocation()), HttpStatus.OK);
    }


    @GetMapping("/manager-coins")
    public ResponseEntity<?> getManagerCoins(@RequestHeader("Authorization") String header,
                                             @RequestParam long userId){
        if(!seatService.validToken(header)){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(seatService.getManagerCoins(userId), HttpStatus.OK);
    }


    @GetMapping("seats/{userId}")
    public ResponseEntity<?> getSeatsForUser(@RequestHeader("Authorization") String header,
                                             @PathVariable long userId){
        if(!seatService.validToken(header)){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(seatService.getAllSeatForUser(userId), HttpStatus.OK);
    }




    @DeleteMapping("/seats/{seatId}")
    public ResponseEntity<?> deleteSeat(@RequestHeader("Authorization") String header,
                                        @PathVariable("seatId") long seatId) {
        if (!seatService.validToken(header)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        boolean isDeleted = seatService.deleteSeat(seatId);
        if (isDeleted) {
            return new ResponseEntity<>("Seat deleted and coins credited back successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Seat deletion failed. Seat/User/Manager not found.", HttpStatus.BAD_REQUEST);
        }
    }
}
