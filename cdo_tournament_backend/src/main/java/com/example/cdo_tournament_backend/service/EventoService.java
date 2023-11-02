package com.example.cdo_tournament_backend.service;

import java.util.List;

import com.example.cdo_tournament_backend.dto.EventoDTO;

public interface EventoService {

    List<EventoDTO> getAllEventos();
    EventoDTO createEvento(EventoDTO eventoDTO);
    EventoDTO getEventoById(int id);
    EventoDTO updateEvento(int id, EventoDTO eventoDTO);
    void deleteEvento(int id);
    
}