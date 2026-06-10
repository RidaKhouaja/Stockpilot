package com.stockpilot.Backend.controller;

import com.stockpilot.Backend.entity.Categorie;
import com.stockpilot.Backend.service.CategorieService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategorieController {

    private final CategorieService categorieService;

    @GetMapping
    public List<Categorie> getAll() {
        return categorieService.getAllCategories();
    }

    @PostMapping
    public Categorie create(@RequestBody Categorie categorie) {
        return categorieService.createCategorie(categorie);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        categorieService.deleteCategorie(id);
    }
}