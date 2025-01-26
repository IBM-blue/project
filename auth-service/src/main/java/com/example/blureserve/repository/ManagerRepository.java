package com.example.blureserve.repository;

import com.example.blureserve.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepository extends JpaRepository<Manager, Long> {
    Manager findByEmail(String email);
}
