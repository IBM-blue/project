package com.example.bookingservice.repository;

import com.example.bookingservice.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {

    @Query(value = "SELECT u.seat_no FROM seat u WHERE u.date = :date AND u.time = :time", nativeQuery = true)
    List<Integer> findByDateAndTime(@Param("date") String date, @Param("time") String time);
}
