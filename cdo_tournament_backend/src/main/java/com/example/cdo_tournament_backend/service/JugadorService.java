package com.example.cdo_tournament_backend.service;

import java.util.List;

import com.example.cdo_tournament_backend.dto.JugadorDTO;

public interface JugadorService {

   List<JugadorDTO> getAllJugadores();
   JugadorDTO createJugador(JugadorDTO jugadorDTO);
   JugadorDTO getJugadorById(int id);
   JugadorDTO updateJugador(int id, JugadorDTO jugadorDTO);
   void deleteJugador(int id);
   JugadorDTO getJugadorByEmail(String email);
}