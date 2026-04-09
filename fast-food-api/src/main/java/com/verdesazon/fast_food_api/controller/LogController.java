package com.verdesazon.fast_food_api.controller;

import com.verdesazon.fast_food_api.model.Log;
import com.verdesazon.fast_food_api.service.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/logs")
@RequiredArgsConstructor
public class LogController {
    private final LogService svc;

    @GetMapping
    public List<Log> getAll() {
        return svc.getAll();
    }

    @GetMapping("/errores")
    public List<Log> getErrores() {
        return svc.getErrores();
    }
}