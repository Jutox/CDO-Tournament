package com.example.cdo_tournament_backend.service;

import java.util.List;

import com.example.cdo_tournament_backend.dto.TorneoDTO;

public interface TorneoService {
    
    List<TorneoDTO> getAllTorneos();
    TorneoDTO createTorneo(TorneoDTO torneoDTO);
    TorneoDTO getTorneoById(int id);
    TorneoDTO updateTorneo(int id, TorneoDTO torneoDTO);
    void deleteTorneo(int id);
}