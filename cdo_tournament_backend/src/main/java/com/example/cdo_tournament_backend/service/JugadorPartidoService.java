package com.example.cdo_tournament_backend.service;

import java.util.List;

import com.example.cdo_tournament_backend.dto.JugadorPartidoDTO;

public interface JugadorPartidoService {

    List<JugadorPartidoDTO> getAllJugadoresPartido();
    JugadorPartidoDTO createJugadorPartido(JugadorPartidoDTO jugadorPartidoDTO);
    JugadorPartidoDTO getJugadorPartidoById(int id);
    JugadorPartidoDTO updateJugadorPartido(int id, JugadorPartidoDTO jugadorPartidoDTO);
    void deleteJugadorPartido(int id);
  
}