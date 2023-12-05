package com.example.cdo_tournament_backend.service;

import java.util.List;

import com.example.cdo_tournament_backend.dto.EventoDTO;

public interface EventoService {

    List<EventoDTO> getAllEventos();
    EventoDTO createEvento(EventoDTO eventoDTO);
    EventoDTO getEventoById(int id);
    EventoDTO updateEvento(int id, EventoDTO eventoDTO);
    void deleteEvento(int id);
    List<EventoDTO> getEventosByIdSet(int idSet);
    List<EventoDTO> getAtaquesExitososByIdJugadorIdTorneo(int idJugador, int idTorneo);    
    List<EventoDTO> getAtaquesExitososByIdJugadorIdPartido(int idJugador, int idPartido);
    List<EventoDTO> getAtaquesExitososByIdJugador(int idJugador);
    List<EventoDTO> getAtaquesFallidosByIdJugadorIdTorneo(int idJugador, int idTorneo); 
    List<EventoDTO> getAtaquesFallidosByIdJugadorIdPartido(int idJugador, int idPartido);
    List<EventoDTO> getAtaquesFallidosByIdJugador(int idJugador);
    List<EventoDTO> getSaquesExitososByIdJugadorIdTorneo(int idJugador, int idTorneo); 
    List<EventoDTO> getSaquesExitososByIdJugadorIdPartido(int idJugador, int idPartido);
    List<EventoDTO> getSaquesExitososByIdJugador(int idJugador);
    List<EventoDTO> getSaquesFallidosByIdJugadorIdTorneo(int idJugador, int idTorneo); 
    List<EventoDTO> getSaquesFallidosByIdJugadorIdPartido(int idJugador, int idPartido);
    List<EventoDTO> getSaquesFallidosByIdJugador(int idJugador);
    List<EventoDTO> getBloqueosExitososByIdJugadorIdTorneo(int idJugador, int idTorneo);
    List<EventoDTO> getBloqueosExitososByIdJugadorIdPartido(int idJugador, int idPartido);
    List<EventoDTO> getBloqueosExitososByIdJugador(int idJugador);
    List<EventoDTO> getAdvertenciasByIdJugadorIdTorneo(int idJugador, int idTorneo);
    List<EventoDTO> getAdvertenciasByIdJugadorIdPartido(int idJugador, int idPartido);
    List<EventoDTO> getAdvertenciasByIdJugador(int idJugador);
    List<EventoDTO> getDescalificacionesByIdJugadorIdTorneo(int idJugador, int idTorneo);
    List<EventoDTO> getDescalificacionesByIdJugadorIdPartido(int idJugador, int idPartido);
    List<EventoDTO> getDescalificacionesByIdJugador(int idJugador);
    List<EventoDTO> getPenalizacionesByIdJugadorIdTorneo(int idJugador, int idTorneo);
    List<EventoDTO> getPenalizacionesByIdJugadorIdPartido(int idJugador, int idPartido);
    List<EventoDTO> getPenalizacionesByIdJugador(int idJugador);
    List<EventoDTO> getAtaquesExitososByIdEquipoIdTorneo(int idEquipo, int idTorneo);    
    List<EventoDTO> getAtaquesExitososByIdEquipoIdPartido(int idEquipo, int idPartido);
    List<EventoDTO> getAtaquesExitososByIdEquipo(int idEquipo);
    List<EventoDTO> getAtaquesFallidosByIdEquipoIdTorneo(int idEquipo, int idTorneo); 
    List<EventoDTO> getAtaquesFallidosByIdEquipoIdPartido(int idEquipo, int idPartido);
    List<EventoDTO> getAtaquesFallidosByIdEquipo(int idEquipo);
    List<EventoDTO> getSaquesExitososByIdEquipoIdTorneo(int idEquipo, int idTorneo); 
    List<EventoDTO> getSaquesExitososByIdEquipoIdPartido(int idEquipo, int idPartido);
    List<EventoDTO> getSaquesExitososByIdEquipo(int idEquipo);
    List<EventoDTO> getSaquesFallidosByIdEquipoIdTorneo(int idEquipo, int idTorneo); 
    List<EventoDTO> getSaquesFallidosByIdEquipoIdPartido(int idEquipo, int idPartido);
    List<EventoDTO> getSaquesFallidosByIdEquipo(int idEquipo);
    List<EventoDTO> getBloqueosExitososByIdEquipoIdTorneo(int idEquipo, int idTorneo);
    List<EventoDTO> getBloqueosExitososByIdEquipoIdPartido(int idEquipo, int idPartido);
    List<EventoDTO> getBloqueosExitososByIdEquipo(int idEquipo);
    List<EventoDTO> getAdvertenciasByIdEquipoIdTorneo(int idEquipo, int idTorneo);
    List<EventoDTO> getAdvertenciasByIdEquipoIdPartido(int idEquipo, int idPartido);
    List<EventoDTO> getAdvertenciasByIdEquipo(int idEquipo);
    List<EventoDTO> getDescalificacionesByIdEquipoIdTorneo(int idEquipo, int idTorneo);
    List<EventoDTO> getDescalificacionesByIdEquipoIdPartido(int idEquipo, int idPartido);
    List<EventoDTO> getDescalificacionesByIdEquipo(int idEquipo);
    List<EventoDTO> getPenalizacionesByIdEquipoIdTorneo(int idEquipo, int idTorneo);
    List<EventoDTO> getPenalizacionesByIdEquipoIdPartido(int idEquipo, int idPartido);
    List<EventoDTO> getPenalizacionesByIdEquipo(int idEquipo);    
}