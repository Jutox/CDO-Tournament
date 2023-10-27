package com.example.cdo_tournament_backend.service;

import java.util.List;

import com.example.cdo_tournament_backend.model.Partido;

public interface PartidoService {

    List<Partido> getAllPartidos();
    Partido createPartido(Partido partido);  
    Partido getPartidoById(int id);
    Partido updatePartido(int id, Partido partido);
    void deletePartido(int id);
}