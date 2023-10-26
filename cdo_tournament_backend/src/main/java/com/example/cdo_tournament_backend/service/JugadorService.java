package com.example.cdo_tournament_backend.service;

import java.util.List;

import com.example.cdo_tournament_backend.model.Jugador;

public interface JugadorService {

   List<Jugador> getAlljugadores();
   Jugador createJugador(Jugador jugador);
   Jugador getJugadorById(int id);
   Jugador updateJugador(int id, Jugador jugador);
   void deleteJugador(int id);
}