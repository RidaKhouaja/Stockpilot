package com.stockpilot.Backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "fournisseurs")
public class Fournisseur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String telephone;
    private String email;
    private String adresse;

    @JsonIgnore
    @OneToMany(mappedBy = "fournisseur", fetch = FetchType.LAZY)
    private List<Produit> produits;
}