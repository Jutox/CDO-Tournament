package com.example.cdo_tournament_backend.service;

import java.util.List;

import com.example.cdo_tournament_backend.model.Partido;

public interface PartidoService {

    List<Partido> getAllPartidos();
    void createPartido(Partido partido);     
}