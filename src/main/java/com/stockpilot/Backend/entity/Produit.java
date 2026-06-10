package com.stockpilot.Backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter ;

@Getter
@Setter
@Entity
@Table(name = "produits")
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String description;
    private Double prix;
    private Integer quantite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categorie_id")
    private Categorie categorie ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="fournisseur_id")
    private Fournisseur fournisseur;

}