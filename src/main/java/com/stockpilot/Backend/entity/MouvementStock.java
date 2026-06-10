package com.stockpilot.Backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "mouvements_stock")
public class MouvementStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "produit_id")
    private Produit produit;

    @Enumerated(EnumType.STRING)
    private TypeMouvement type;

    private Integer quantite;
    private String motif;
    private LocalDateTime date;

    public enum TypeMouvement {
        ENTREE, SORTIE
    }

    @PrePersist
    public void prePersist() {
        this.date = LocalDateTime.now();
    }
}