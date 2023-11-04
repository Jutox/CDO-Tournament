package com.example.cdo_tournament_backend.service;

import java.util.List;

import com.example.cdo_tournament_backend.dto.EquipoDTO;

public interface EquipoService {

    List<EquipoDTO> getAllEquipos();
    EquipoDTO createEquipo(EquipoDTO equipoDTO);
    EquipoDTO getEquipoById(int id);
    EquipoDTO updateEquipo(int id, EquipoDTO equipoDTO);
    void deleteEquipo(int id);
}