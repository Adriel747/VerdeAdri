package com.verdesazon.fast_food_api.controller;

import com.verdesazon.fast_food_api.dto.ProductoDto;
import com.verdesazon.fast_food_api.model.Producto;
import com.verdesazon.fast_food_api.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoController {
    private final ProductoService svc;

    @GetMapping
    public List<Producto> getAll() {
        return svc.getAll();

    }

    @GetMapping("/disponibles")
    public List<Producto> getDisponibles() {
        return svc.getDisponibles();
    }

    @GetMapping("/{id}")
    public Producto getOne(@PathVariable Long id) {
        return svc.getOne(id);
    }

    @PostMapping
    public Producto create(@RequestBody ProductoDto dto) {
        return svc.create(dto);
    }

    @PutMapping("/{id}")
    public Producto update(@PathVariable Long id, @RequestBody ProductoDto dto) {
        return svc.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        svc.delete(id);
        return ResponseEntity.ok(Map.of("eliminado", true));
    }
}