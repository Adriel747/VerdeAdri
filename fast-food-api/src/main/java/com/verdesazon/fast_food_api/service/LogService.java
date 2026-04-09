package com.verdesazon.fast_food_api.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.verdesazon.fast_food_api.model.Log;
import com.verdesazon.fast_food_api.repository.LogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service

@RequiredArgsConstructor
public class LogService {
    private final LogRepository repo;
    private final ObjectMapper mapper = new ObjectMapper();

    public void log(String accion, String endpoint, Object datos, String status) {
        try {
            Log log = new Log();
            log.setAccion(accion);
            log.setEndpoint(endpoint);
            log.setStatus(status);
            log.setDatos(mapper.writeValueAsString(datos));
            repo.save(log);
        } catch (Exception e) {
            System.err.println("Error guardando log: " + e.getMessage());
        }
    }

    public void log(String accion, String endpoint, Object datos) {
        log(accion, endpoint, datos, "OK");
    }

    public List<Log> getAll() {
        return repo.findTop50ByOrderByFechaDesc();
    }

    public List<Log> getErrores() {
        return repo.findByStatus("ERROR");
    }
}