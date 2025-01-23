package com.example.bookingservice.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "seat")

public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)            // auto-increment
    private long id;
    private String date;
    private String time;

    @Column(name = "user_id")
    private long userId;

    @Column(name = "seat_no")
    private int seatNo;

    public Seat() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public int getSeatNo() {
        return seatNo;
    }

    public void setSeatNo(int seatNo) {
        this.seatNo = seatNo;
    }

    public Seat(String date, String time, long userId, int seatNo) {
        this.date = date;
        this.time = time;
        this.userId = userId;
        this.seatNo = seatNo;
    }
}
