package com.example.cdo_tournament_backend.service;

import java.util.List;

import com.example.cdo_tournament_backend.dto.SetPartidoDTO;

public interface SetPartidoService {

    List<SetPartidoDTO> getAllSetsPartido();
    SetPartidoDTO createSetPartido(SetPartidoDTO setPartidoDTO);
    SetPartidoDTO getSetPartidoById(int id);
    SetPartidoDTO updateSetPartido(int id, SetPartidoDTO setPartidoDTO);
    void deleteSetPartido(int id);
    List<SetPartidoDTO> getSetsByPartido(int idPartido);
}