package com.example.cdo_tournament_backend.service;

import java.util.List;

import com.example.cdo_tournament_backend.model.Equipo;

public interface EquipoService {

    List<Equipo> getAllEquipos();
    Equipo createEquipo(Equipo equipo);
    Equipo getEquipoById(int id);
    Equipo updateEquipo(int id, Equipo equipo);
    void deleteEquipo(int id);
}