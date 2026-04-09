package com.verdesazon.fast_food_api.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}