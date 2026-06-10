package com.stockpilot.Backend.repository;

import com.stockpilot.Backend.entity.MouvementStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MouvementStockRepository extends JpaRepository<MouvementStock, Long> {
    List<MouvementStock> findByProduitIdOrderByDateDesc(Long produitId);
}