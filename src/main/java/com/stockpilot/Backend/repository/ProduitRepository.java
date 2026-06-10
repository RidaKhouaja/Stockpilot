package com.stockpilot.Backend.repository;

import com.stockpilot.Backend.entity.Produit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {

    @Query("SELECT p FROM Produit p WHERE " +
            "(:nom IS NULL OR LOWER(p.nom) LIKE LOWER(CONCAT('%', :nom, '%'))) AND " +
            "(:categorieId IS NULL OR p.categorie.id = :categorieId)")
    Page<Produit> findWithFilters(
            @Param("nom") String nom,
            @Param("categorieId") Long categorieId,
            Pageable pageable
    );

    // ✅ NULL safe — كيرجع 0.0 بدل null
    @Query("SELECT COALESCE(SUM(p.prix * p.quantite), 0.0) FROM Produit p")
    Double calculerValeurTotaleStock();

    // ✅ Stock bas
    Long countByQuantiteLessThan(int quantite);
}