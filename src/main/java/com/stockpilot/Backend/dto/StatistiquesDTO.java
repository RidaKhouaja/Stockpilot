package com.stockpilot.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatistiquesDTO {

    private Long totalProduits;
    private Double valeurTotaleStock;
    private Long produitsStockBas;
    private Long totalCategories;
    private Long totalFournisseurs;
}