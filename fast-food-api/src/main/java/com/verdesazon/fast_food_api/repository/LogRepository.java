package com.verdesazon.fast_food_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.verdesazon.fast_food_api.model.Log;

public interface LogRepository extends JpaRepository<Log, Long> {
    List<Log> findTop50ByOrderByFechaDesc();
    List<Log> findByStatus(String status);
}