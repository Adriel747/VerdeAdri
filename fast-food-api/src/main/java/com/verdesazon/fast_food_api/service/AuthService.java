package com.verdesazon.fast_food_api.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.verdesazon.fast_food_api.dto.LoginRequest;
import com.verdesazon.fast_food_api.dto.LoginResponse;
import com.verdesazon.fast_food_api.model.Usuario;
import com.verdesazon.fast_food_api.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UsuarioRepository repo;
    private final PasswordEncoder passwordEncoder;
    private final LogService logService;

   public LoginResponse login(LoginRequest request) {
          logService.log("LOGIN", "/auth/login", Map.of("email", request.getEmail()));

          // 1. Buscar usuario
          Usuario usuario = repo.findByEmail(request.getEmail()).orElse(null);

          // 2. Si no existe o la contraseña no coincide (usando .equals como pediste)
          if (usuario == null || !request.getPassword().equals(usuario.getPassword())) {
              logService.log("LOGIN", "/auth/login", Map.of("error", "Fallo de autenticación"), "ERROR");
              // En lugar de throw, devolvemos un objeto con mensaje de error
              return new LoginResponse(null, null, "Credenciales incorrectas");
          }

          // 3. Éxito
          logService.log("LOGIN", "/auth/login", Map.of("email", usuario.getEmail(), "rol", usuario.getRol()));
          return new LoginResponse(usuario.getEmail(), usuario.getRol(), "Login exitoso");
      }
}
