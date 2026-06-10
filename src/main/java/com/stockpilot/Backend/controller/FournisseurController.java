package com.stockpilot.Backend.controller;

import com.stockpilot.Backend.entity.Fournisseur;
import com.stockpilot.Backend.service.FournisseurService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fournisseurs")
@RequiredArgsConstructor
public class FournisseurController {

    private final FournisseurService fournisseurService;

    @GetMapping
    public List<Fournisseur> getAll() {
        return fournisseurService.getAllFournisseurs();
    }

    @PostMapping
    public Fournisseur create(@RequestBody Fournisseur fournisseur) {
        return fournisseurService.createFournisseur(fournisseur);
    }

    @PutMapping("/{id}")
    public Fournisseur update(@PathVariable Long id, @RequestBody Fournisseur fournisseur) {
        return fournisseurService.updateFournisseur(id, fournisseur);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        fournisseurService.deleteFournisseur(id);
    }
}