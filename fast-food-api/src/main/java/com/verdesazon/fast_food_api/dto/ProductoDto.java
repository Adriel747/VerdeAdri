package com.verdesazon.fast_food_api.dto;

import lombok.Data;

@Data
public class ProductoDto {
    private String nombre;
    private String descripcion;
    private Double precio;
    private String categoria;
    private Boolean disponible;
}