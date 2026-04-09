package com.verdesazon.fast_food_api.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.verdesazon.fast_food_api.dto.ProductoDto;
import com.verdesazon.fast_food_api.model.Producto;
import com.verdesazon.fast_food_api.repository.ProductoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductoService {
    private final ProductoRepository repo;
    private final LogService logService;

    public List<Producto> getAll() {
        List<Producto> productos = repo.findAll();
        logService.log("GET_ALL", "/productos", Map.of("total", productos.size()));
        return productos;
    }

    public List<Producto> getDisponibles() {
        return repo.findByDisponibleTrue();
    }

    public Producto getOne(Long id) {
        return repo.findById(id).orElseThrow(() ->
            new RuntimeException("Producto no encontrado: " + id));
    }

    public Producto create(ProductoDto dto) {
        logService.log("CREATE", "/productos", dto);
        try {
            Producto p = new Producto();
            p.setNombre(dto.getNombre());
            p.setDescripcion(dto.getDescripcion());
            p.setPrecio(dto.getPrecio());
            p.setCategoria(dto.getCategoria());
            p.setDisponible(dto.getDisponible() != null ? dto.getDisponible() : true);
            Producto saved = repo.save(p);
            logService.log("CREATE", "/productos", Map.of("id", saved.getId(), "nombre", saved.getNombre()));
            return saved;
        } catch (Exception e) {
            logService.log("CREATE", "/productos", Map.of("error", e.getMessage()), "ERROR");
            throw e;
        }
    }

    public Producto update(Long id, ProductoDto dto) {
        logService.log("UPDATE", "/productos/" + id, dto);
        try {
            Producto p = getOne(id);
            if (dto.getNombre() != null) p.setNombre(dto.getNombre());
            if (dto.getDescripcion() != null) p.setDescripcion(dto.getDescripcion());
            if (dto.getPrecio() != null) p.setPrecio(dto.getPrecio());
            if (dto.getCategoria() != null) p.setCategoria(dto.getCategoria());
            if (dto.getDisponible() != null) p.setDisponible(dto.getDisponible());
            return repo.save(p);
        } catch (Exception e) {
            logService.log("UPDATE", "/productos/" + id, Map.of("error", e.getMessage()), "ERROR");
            throw e;
        }
    }

    public void delete(Long id) {
        logService.log("DELETE", "/productos/" + id, Map.of("id", id));
        try {
            Producto p = getOne(id);
            repo.delete(p);
            logService.log("DELETE", "/productos/" + id, Map.of("eliminado", true, "nombre", p.getNombre()));
        } catch (Exception e) {
            logService.log("DELETE", "/productos/" + id, Map.of("error", e.getMessage()), "ERROR");
            throw e;
        }
    }
}