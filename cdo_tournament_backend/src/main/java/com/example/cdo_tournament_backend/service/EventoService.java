package com.example.cdo_tournament_backend.service;

import java.util.List;

import com.example.cdo_tournament_backend.dto.EventoDTO;

public interface EventoService {

    List<EventoDTO> getAllEventos();
    EventoDTO createEvento(EventoDTO eventoDTO);
    EventoDTO getEventoById(int id);
    EventoDTO updateEvento(int id, EventoDTO eventoDTO);
    void deleteEvento(int id);    
    List<EventoDTO> getAtaquesExitososByIdJugadorIdPartido(int idJugador, int idPartido);
    List<EventoDTO> getAtaquesExitososByIdJugador(int idJugador);
    List<EventoDTO> getAtaquesFallidosByIdJugadorIdPartido(int idJugador, int idPartido);
    List<EventoDTO> getAtaquesFallidosByIdJugador(int idJugador);
    List<EventoDTO> getSaquesExitososByIdJugadorIdPartido(int idJugador, int idPartido);
    List<EventoDTO> getSaquesExitososByIdJugador(int idJugador);
    List<EventoDTO> getSaquesFallidosByIdJugadorIdPartido(int idJugador, int idPartido);
    List<EventoDTO> getSaquesFallidosByIdJugador(int idJugador);
    List<EventoDTO> getBloqueosExitososByIdJugadorIdPartido(int idJugador, int idPartido);
    List<EventoDTO> getBloqueosExitososByIdJugador(int idJugador);
    List<EventoDTO> getAdvertenciasByIdJugadorIdPartido(int idJugador, int idPartido);
    List<EventoDTO> getAdvertenciasByIdJugador(int idJugador);
    List<EventoDTO> getDescalificacionesByIdJugadorIdPartido(int idJugador, int idPartido);
    List<EventoDTO> getDescalificacionesByIdJugador(int idJugador);
    List<EventoDTO> getPenalizacionesByIdJugadorIdPartido(int idJugador, int idPartido);
    List<EventoDTO> getPenalizacionesByIdJugador(int idJugador);
}