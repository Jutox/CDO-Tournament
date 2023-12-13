package com.example.cdo_tournament_backend.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.cdo_tournament_backend.dto.EquipoDTO;
import com.example.cdo_tournament_backend.dto.ListaJugadoresPartidoDTO;
import com.example.cdo_tournament_backend.dto.PartidoDTO;
import com.example.cdo_tournament_backend.model.Equipo;
import com.example.cdo_tournament_backend.model.ListaJugadoresPartido;
import com.example.cdo_tournament_backend.model.Partido;

@Component
public class ListaJugadoresPartidoMapper {

    @Autowired
    private EquipoMapper equipoMapper;

    @Autowired 
    private PartidoMapper partidoMapper;

    public ListaJugadoresPartidoDTO toDTO(ListaJugadoresPartido lista){
        ListaJugadoresPartidoDTO listaDTO = new ListaJugadoresPartidoDTO();
        listaDTO.setIdListaJugadoresPartido(lista.getIdListaJugadoresPartido());

        EquipoDTO equipoDTO = (lista.getEquipo() != null) ? equipoMapper.toDTO(lista.getEquipo()) : null;
        listaDTO.setEquipo(equipoDTO);

        PartidoDTO partidoDTO = (lista.getPartido() != null) ? partidoMapper.toDTO(lista.getPartido()) : null;
        listaDTO.setPartido(partidoDTO);

        return listaDTO;
    }

    public ListaJugadoresPartido toEntity(ListaJugadoresPartidoDTO listaDTO){
        ListaJugadoresPartido lista = new ListaJugadoresPartido();
        lista.setIdListaJugadoresPartido(listaDTO.getIdListaJugadoresPartido());
        
        Equipo equipo = (listaDTO.getEquipo() != null) ? equipoMapper.toEntity(listaDTO.getEquipo()) : null;
        lista.setEquipo(equipo);
    
        Partido partido = (listaDTO.getPartido() != null) ? partidoMapper.toEntity(listaDTO.getPartido()) : null;
        lista.setPartido(partido);

        return lista;
    }
}
