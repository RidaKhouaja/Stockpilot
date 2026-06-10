package com.stockpilot.Backend.controller;

import com.stockpilot.Backend.dto.StatistiquesDTO;
import com.stockpilot.Backend.service.StatistiquesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/statistiques")
@RequiredArgsConstructor
public class StatistiquesController {

    private final StatistiquesService statistiquesService;

    @GetMapping
    public ResponseEntity<StatistiquesDTO> getStatistiques() {
        log.info("Requête statistiques reçue");
        return ResponseEntity.ok(statistiquesService.getStatistiques());
    }
}