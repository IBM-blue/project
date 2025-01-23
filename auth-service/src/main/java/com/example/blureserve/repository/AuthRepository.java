package com.example.blureserve.repository;

import com.example.blureserve.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM userd u WHERE u.username = :username AND u.password = :password", nativeQuery = true)
    User findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
}

