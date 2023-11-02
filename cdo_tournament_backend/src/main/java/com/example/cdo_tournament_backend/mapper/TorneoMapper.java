package com.example.cdo_tournament_backend.mapper;

import org.springframework.stereotype.Component;

import com.example.cdo_tournament_backend.dto.TorneoDTO;
import com.example.cdo_tournament_backend.model.Torneo;

@Component
public class TorneoMapper {

    public TorneoDTO toDTO(Torneo torneo) {
        TorneoDTO torneoDTO = new TorneoDTO();
        torneoDTO.setIdTorneo(torneo.getIdTorneo());
        torneoDTO.setNombre(torneo.getNombre());
        torneoDTO.setFechaInicio(torneo.getFechaInicio());
        torneoDTO.setFechaTermino(torneo.getFechaTermino());
        torneoDTO.setLugar(torneo.getLugar());
        return torneoDTO;
    }

    public Torneo toEntity(TorneoDTO torneoDTO) {
        Torneo torneo = new Torneo();
        torneo.setIdTorneo(torneoDTO.getIdTorneo());
        torneo.setNombre(torneoDTO.getNombre());
        torneo.setFechaInicio(torneoDTO.getFechaInicio());
        torneo.setFechaTermino(torneoDTO.getFechaTermino());
        torneo.setLugar(torneoDTO.getLugar());

        return torneo;
    }
}
