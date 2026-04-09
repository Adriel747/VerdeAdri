package com.verdesazon.fast_food_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.verdesazon.fast_food_api.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findByDisponibleTrue();
    List<Producto> findByCategoria(String categoria);
}