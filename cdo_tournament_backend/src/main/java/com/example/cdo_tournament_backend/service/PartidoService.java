package com.example.cdo_tournament_backend.service;

import java.util.List;

import com.example.cdo_tournament_backend.dto.PartidoDTO;

public interface PartidoService {

    List<PartidoDTO> getAllPartidos();
    PartidoDTO createPartido(PartidoDTO partidoDTO);
    PartidoDTO getPartidoById(int id);
    PartidoDTO updatePartido(int id, PartidoDTO partidoDTO);
    void deletePartido(int id);
    List<PartidoDTO> getPartidosByTorneo(int idTorneo);
}