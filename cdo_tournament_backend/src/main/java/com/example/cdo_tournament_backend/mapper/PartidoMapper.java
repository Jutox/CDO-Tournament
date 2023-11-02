package com.example.cdo_tournament_backend.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.cdo_tournament_backend.dto.PartidoDTO;
import com.example.cdo_tournament_backend.dto.TorneoDTO;
import com.example.cdo_tournament_backend.model.Partido;
import com.example.cdo_tournament_backend.model.Torneo;

@Component
public class PartidoMapper {

    @Autowired
    private TorneoMapper torneoMapper;

    public  PartidoDTO toDTO(Partido partido) {
        PartidoDTO partidoDTO = new PartidoDTO();
        partidoDTO.setIdPartido(partido.getIdPartido());
        partidoDTO.setNombreCompeticion(partido.getNombreCompeticion());
        partidoDTO.setCiudad(partido.getCiudad());
        partidoDTO.setCodigoPais(partido.getCodigoPais());
        partidoDTO.setRecinto(partido.getRecinto());
        partidoDTO.setFase(partido.getFase());
        partidoDTO.setNumeroPartido(partido.getNumeroPartido());
        partidoDTO.setDivision(partido.getDivision());
        partidoDTO.setCategoria(partido.getCategoria());
        partidoDTO.setFecha(partido.getFecha());
        partidoDTO.setHora(partido.getHora());

        TorneoDTO torneoDTO = (partido.getTorneo() != null) ? torneoMapper.toDTO(partido.getTorneo()) : null;
        partidoDTO.setTorneo(torneoDTO);

        return partidoDTO;
    }

    public Partido toEntity(PartidoDTO partidoDTO) {
        Partido partido = new Partido();
        partido.setIdPartido(partidoDTO.getIdPartido());
        partido.setNombreCompeticion(partidoDTO.getNombreCompeticion());
        partido.setCiudad(partidoDTO.getCiudad());
        partido.setCodigoPais(partidoDTO.getCodigoPais());
        partido.setRecinto(partidoDTO.getRecinto());
        partido.setFase(partidoDTO.getFase());
        partido.setNumeroPartido(partidoDTO.getNumeroPartido());
        partido.setDivision(partidoDTO.getDivision());
        partido.setCategoria(partidoDTO.getCategoria());
        partido.setFecha(partidoDTO.getFecha());
        partido.setHora(partidoDTO.getHora());

        Torneo torneo = (partidoDTO.getTorneo() != null) ? torneoMapper.toEntity(partidoDTO.getTorneo()) : null;
        partido.setTorneo(torneo);

        return partido;
    }
}