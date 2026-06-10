package com.stockpilot.Backend.service;

import com.stockpilot.Backend.entity.MouvementStock;
import com.stockpilot.Backend.entity.Produit;
import com.stockpilot.Backend.repository.MouvementStockRepository;
import com.stockpilot.Backend.repository.ProduitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MouvementStockService {

    private final MouvementStockRepository mouvementStockRepository;
    private final ProduitRepository produitRepository; 

    public MouvementStock addMouvement(Long produitId, MouvementStock mouvement) {

        Produit produit = produitRepository.findById(produitId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Produit introuvable"
                ));

        if (mouvement.getType() == MouvementStock.TypeMouvement.ENTREE) {
            produit.setQuantite(produit.getQuantite() + mouvement.getQuantite());
        } else {
            if (produit.getQuantite() < mouvement.getQuantite()) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Stock insuffisant !"
                );
            }
            produit.setQuantite(produit.getQuantite() - mouvement.getQuantite());
        }

        produitRepository.save(produit);
        mouvement.setProduit(produit);
        return mouvementStockRepository.save(mouvement);
    }

    public List<MouvementStock> getHistorique(Long produitId) {
        return mouvementStockRepository.findByProduitIdOrderByDateDesc(produitId);
    }
}