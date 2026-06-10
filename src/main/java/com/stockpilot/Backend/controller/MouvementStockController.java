package com.stockpilot.Backend.controller;

import com.stockpilot.Backend.entity.MouvementStock;
import com.stockpilot.Backend.service.MouvementStockService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stock")
@RequiredArgsConstructor
public class MouvementStockController {

    private final MouvementStockService mouvementStockService;

    @PostMapping("/{produitId}/mouvement")
    public MouvementStock addMouvement(
            @PathVariable Long produitId,
            @RequestBody MouvementStock mouvement) {
        return mouvementStockService.addMouvement(produitId, mouvement);
    }

    @GetMapping("/{produitId}/historique")
    public List<MouvementStock> getHistorique(@PathVariable Long produitId) {
        return mouvementStockService.getHistorique(produitId);
    }
}