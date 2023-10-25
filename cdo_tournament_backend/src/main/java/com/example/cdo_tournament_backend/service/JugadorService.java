package com.example.cdo_tournament_backend.service;

import java.util.List;

import com.example.cdo_tournament_backend.model.Jugador;

public interface JugadorService {

   List<Jugador> getAlljugadores();
   void createJugador(Jugador jugador);
}