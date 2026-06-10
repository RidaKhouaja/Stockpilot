package com.stockpilot.Backend.repository;

import com.stockpilot.Backend.entity.Categorie; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorieRepository extends JpaRepository<Categorie, Long> {


}