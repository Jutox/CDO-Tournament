package com.example.cdo_tournament_backend.service;

import java.util.List;

import com.example.cdo_tournament_backend.model.Torneo;

public interface TorneoService {
    
    List<Torneo> getAllTorneos();
    Torneo createTorneo(Torneo torneo);
    Torneo getTorneoById(int id);
    Torneo updateTorneo(int id, Torneo torneo);
    void deleteTorneo(int id);
}