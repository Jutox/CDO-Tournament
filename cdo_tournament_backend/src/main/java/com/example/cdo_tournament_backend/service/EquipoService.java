package com.example.cdo_tournament_backend.service;

import java.util.List;

import com.example.cdo_tournament_backend.model.Equipo;

public interface EquipoService {

    List<Equipo> getAllEquipos();
    void createEquipo(Equipo equipo);

}