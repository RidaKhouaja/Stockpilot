package com.stockpilot.Backend.service;

import com.stockpilot.Backend.dto.StatistiquesDTO;
import com.stockpilot.Backend.repository.CategorieRepository;
import com.stockpilot.Backend.repository.FournisseurRepository;
import com.stockpilot.Backend.repository.ProduitRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class StatistiquesService {

    private final ProduitRepository produitRepository;
    private final CategorieRepository categorieRepository;
    private final FournisseurRepository fournisseurRepository;

    private static final int SEUIL_STOCK_BAS = 10;

    public StatistiquesDTO getStatistiques() {
        try {
            log.info("Calcul des statistiques...");

            return new StatistiquesDTO(
                    produitRepository.count(),
                    produitRepository.calculerValeurTotaleStock(),
                    produitRepository.countByQuantiteLessThan(SEUIL_STOCK_BAS),
                    categorieRepository.count(),
                    fournisseurRepository.count()
            );

        } catch (Exception e) {
            log.error("Erreur calcul statistiques : {}", e.getMessage());
            throw new RuntimeException("Erreur lors du calcul des statistiques");
        }
    }
}