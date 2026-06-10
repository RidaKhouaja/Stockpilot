package com.stockpilot.Backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter ;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore ;

@Getter
@Setter 
@Entity
@Table(name = "categories")
public class Categorie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String description;
    @JsonIgnore
    @OneToMany(mappedBy = "categorie")
    private List<Produit> produits;
}