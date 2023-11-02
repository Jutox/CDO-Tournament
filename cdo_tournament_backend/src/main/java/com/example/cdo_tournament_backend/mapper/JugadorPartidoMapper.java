package com.example.cdo_tournament_backend.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.cdo_tournament_backend.dto.JugadorDTO;  
import com.example.cdo_tournament_backend.dto.JugadorPartidoDTO;
import com.example.cdo_tournament_backend.dto.ListaJugadoresPartidoDTO;
import com.example.cdo_tournament_backend.model.Jugador;
import com.example.cdo_tournament_backend.model.JugadorPartido;
import com.example.cdo_tournament_backend.model.ListaJugadoresPartido;

@Component
public class JugadorPartidoMapper {
    
    @Autowired
    private JugadorMapper jugadorMapper;

    @Autowired
    private ListaJugadoresPartidoMapper listaJugadoresPartidoMapper;
    
    public JugadorPartidoDTO toDTO(JugadorPartido jugadorPartido){
        JugadorPartidoDTO jugadorPartidoDTO = new JugadorPartidoDTO();
        jugadorPartidoDTO.setIdJugadorPartido(jugadorPartido.getIdJugadorPartido());
        jugadorPartidoDTO.setCapitan(jugadorPartido.isCapitan());
        jugadorPartidoDTO.setNumeroCamiseta(jugadorPartido.getNumeroCamiseta());

        JugadorDTO jugadorDTO = jugadorMapper.toDTO(jugadorPartido.getJugador());
        jugadorPartidoDTO.setJugador(jugadorDTO);

        ListaJugadoresPartidoDTO listaJugadoresPartidoDTO = listaJugadoresPartidoMapper.toDTO(jugadorPartido.getListaJugadoresPartido());
        jugadorPartidoDTO.setListaJugadoresPartido(listaJugadoresPartidoDTO);

        return jugadorPartidoDTO;
    }

    public JugadorPartido toEntity(JugadorPartidoDTO jugadorPartidoDTO){
        JugadorPartido jugadorPartido = new JugadorPartido();
        
        ListaJugadoresPartido lista = new ListaJugadoresPartido();
        lista.setIdListaJugadoresPartido(jugadorPartidoDTO.getListaJugadoresPartido().getIdListaJugadoresPartido());
        jugadorPartido.setListaJugadoresPartido(lista);
        Jugador jugador = new Jugador();
        jugador.setIdJugador(jugadorPartidoDTO.getJugador().getIdJugador());
        jugadorPartido.setJugador(jugador);

        jugadorPartido.setCapitan(jugadorPartidoDTO.isCapitan());
        jugadorPartido.setNumeroCamiseta(jugadorPartidoDTO.getNumeroCamiseta());

        return jugadorPartido;
    }
}