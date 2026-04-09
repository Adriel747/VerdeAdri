package com.verdesazon.fast_food_api.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String email;
    private String rol;
    private String mensaje;

    public LoginResponse(String email, String rol, String mensaje) {
        this.email = email;
        this.rol = rol;
        this.mensaje = mensaje;
    }
}