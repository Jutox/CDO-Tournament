package com.example.cdo_tournament_backend.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.cdo_tournament_backend.dto.EventoDTO;
import com.example.cdo_tournament_backend.dto.JugadorPartidoDTO;
import com.example.cdo_tournament_backend.dto.SetPartidoDTO;
import com.example.cdo_tournament_backend.model.Evento;
import com.example.cdo_tournament_backend.model.JugadorPartido;
import com.example.cdo_tournament_backend.model.SetPartido;
import com.example.cdo_tournament_backend.model.TipoEvento;

@Component
public class EventoMapper {

    @Autowired
    private JugadorPartidoMapper jugadorPartidoMapper;

    @Autowired
    private SetPartidoMapper setPartidoMapper;

    public EventoDTO toDTO(Evento evento){
        EventoDTO eventoDTO = new EventoDTO();
        eventoDTO.setIdEvento(evento.getIdEvento());
        eventoDTO.setHora(evento.getHora());
        eventoDTO.setTipo(evento.getTipo().toString());
        eventoDTO.setPuntos(evento.getPuntos());
        eventoDTO.setOrdenServicio(evento.getOrdenServicio());
        eventoDTO.setRondaServicio(evento.getRondaServicio());

        JugadorPartidoDTO jugadorPartidoDTO = (evento.getJugadorPartido() != null) ? jugadorPartidoMapper.toDTO(evento.getJugadorPartido()) : null;
        eventoDTO.setJugadorPartido(jugadorPartidoDTO);

        SetPartidoDTO setPartidoDTO = (evento.getSetPartido() != null) ? setPartidoMapper.toDTO(evento.getSetPartido()) : null;
        eventoDTO.setSet(setPartidoDTO);

        return eventoDTO;
    }

    public Evento toEntity(EventoDTO eventoDTO){
        Evento evento = new Evento();
        evento.setIdEvento(eventoDTO.getIdEvento());
        evento.setHora(eventoDTO.getHora());
        evento.setTipo(TipoEvento.valueOf(eventoDTO.getTipo()));
        evento.setPuntos(eventoDTO.getPuntos());
        evento.setOrdenServicio(eventoDTO.getOrdenServicio());
        evento.setRondaServicio(eventoDTO.getRondaServicio());

        JugadorPartido jugadorPartido = (eventoDTO.getJugadorPartido() != null) ? jugadorPartidoMapper.toEntity(eventoDTO.getJugadorPartido()) : null;
        evento.setJugadorPartido(jugadorPartido);
    
        SetPartido setPartido = (eventoDTO.getSet() != null) ? setPartidoMapper.toEntity(eventoDTO.getSet()) : null;
        evento.setSetPartido(setPartido);
        
        return evento;
    }
    
}
