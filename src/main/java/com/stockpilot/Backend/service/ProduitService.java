package com.stockpilot.Backend.service;

import com.stockpilot.Backend.entity.Produit;
import com.stockpilot.Backend.repository.CategorieRepository;
import com.stockpilot.Backend.repository.FournisseurRepository;
import com.stockpilot.Backend.repository.ProduitRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProduitService {

    private final ProduitRepository produitRepository;
    private final CategorieRepository categorieRepository;
    private final FournisseurRepository fournisseurRepository;

    public Page<Produit> getAllProduits(int page, int size, String nom, Long categorieId) {
        return produitRepository.findWithFilters(nom, categorieId, PageRequest.of(page, size));
    }

    public Produit createProduit(Produit produit) {
        if (produit.getCategorie() != null && produit.getCategorie().getId() != null) {
            categorieRepository.findById(produit.getCategorie().getId())
                    .ifPresent(produit::setCategorie);
        }
        if (produit.getFournisseur() != null && produit.getFournisseur().getId() != null) {
            fournisseurRepository.findById(produit.getFournisseur().getId())
                    .ifPresent(produit::setFournisseur);
        }
        return produitRepository.save(produit);
    }

    public Produit updateProduit(Long id, Produit produit) {
        produit.setId(id);
        if (produit.getCategorie() != null && produit.getCategorie().getId() != null) {
            categorieRepository.findById(produit.getCategorie().getId())
                    .ifPresent(produit::setCategorie);
        }
        if (produit.getFournisseur() != null && produit.getFournisseur().getId() != null) {
            fournisseurRepository.findById(produit.getFournisseur().getId())
                    .ifPresent(produit::setFournisseur);
        }
        return produitRepository.save(produit);
    }

    public void deleteProduit(Long id) {
        produitRepository.deleteById(id);
    }
}