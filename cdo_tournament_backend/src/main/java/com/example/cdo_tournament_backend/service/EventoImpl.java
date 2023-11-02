package com.example.cdo_tournament_backend.service;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cdo_tournament_backend.dto.EventoDTO;
import com.example.cdo_tournament_backend.mapper.EventoMapper;
import com.example.cdo_tournament_backend.model.Evento;
import com.example.cdo_tournament_backend.repository.EventoRepository;


@Service
@Transactional
public class EventoImpl implements EventoService{

    @Autowired
    private EventoRepository eventoRepository; // Repositorio para acceder a los datos de los eventos

    @Autowired
    private EventoMapper eventoMapper; // Mapeador para convertir entre entidades y DTOs

    @Override
    public List<EventoDTO> getAllEventos() {
        List<Evento> eventosDB = eventoRepository.findAll();
        List<EventoDTO> retornoDTO = eventosDB.stream()
                .map(eventoMapper::toDTO)
                .collect(Collectors.toList());
        return retornoDTO;
    }

    @Override
    public EventoDTO createEvento(EventoDTO eventoDTO) {
        // Convierte el DTO a una entidad Evento usando el EventoMapper
        Evento evento = eventoMapper.toEntity(eventoDTO);
        // Guarda la entidad en la base de datos
        evento = eventoRepository.save(evento);
        // Convierte la entidad nuevamente a DTO y devuélvela
        return eventoMapper.toDTO(evento);
    }

    @Override
    public EventoDTO getEventoById(int id) {
        Optional<Evento> evento = eventoRepository.findById(id);
        return evento.map(eventoMapper::toDTO).orElse(null);
    }

    @Override
    public EventoDTO updateEvento(int id, EventoDTO eventoDTO) {
        Evento nuevo = eventoMapper.toEntity(eventoDTO);
        Evento existente = eventoRepository.findById(id).orElse(null);
        if (existente != null) {
            // Actualiza los atributos de la entidad con los valores del DTO
            existente.setHora(nuevo.getHora());
            existente.setTipo(nuevo.getTipo());
            existente.setPuntos(nuevo.getPuntos());
            existente.setOrdenServicio(nuevo.getOrdenServicio());
            existente.setRondaServicio(nuevo.getRondaServicio());
            existente.setSetPartido(nuevo.getSetPartido());
            existente.setJugadorPartido(nuevo.getJugadorPartido());
            
            // Guarda la entidad actualizada en la base de datos
            existente = eventoRepository.save(existente);
            // Convierte la entidad nuevamente a DTO y devuélvela
            return eventoMapper.toDTO(existente);
        } else {
            return null; // Retorna null si el evento no existe
        }
    }

    @Override
    public void deleteEvento(int id) {
        eventoRepository.deleteById(id); // Elimina un evento por su ID
    }
}