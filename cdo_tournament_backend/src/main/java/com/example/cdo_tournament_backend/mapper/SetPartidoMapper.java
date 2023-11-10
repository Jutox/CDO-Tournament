package com.example.cdo_tournament_backend.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.cdo_tournament_backend.dto.PartidoDTO;
import com.example.cdo_tournament_backend.dto.SetPartidoDTO;
import com.example.cdo_tournament_backend.model.Partido;
import com.example.cdo_tournament_backend.model.SetPartido;

@Component
public class SetPartidoMapper {
    
    @Autowired
    private PartidoMapper partidoMapper;

    public SetPartidoDTO toDTO(SetPartido setPartido){
        SetPartidoDTO setPartidoDTO = new SetPartidoDTO();
        setPartidoDTO.setIdSetPartido(setPartido.getIdSetPartido());
        setPartidoDTO.setHoraInicio(setPartido.getHoraInicio());
        setPartidoDTO.setHoraTermino(setPartido.getHoraTermino());
        setPartidoDTO.setPuntajeA(setPartido.getPuntajeA());
        setPartidoDTO.setPuntajeB(setPartido.getPuntajeB());
        setPartidoDTO.setNumeroSet(setPartido.getNumeroSet());

        PartidoDTO partidoDTO = (setPartido.getPartido() != null) ? partidoMapper.toDTO(setPartido.getPartido()) : null;
        setPartidoDTO.setPartido(partidoDTO);

        return setPartidoDTO;
    }

    public SetPartido toEntity(SetPartidoDTO setPartidoDTO) {
        SetPartido setPartido = new SetPartido();

        setPartido.setIdSetPartido(setPartidoDTO.getIdSetPartido());
        setPartido.setHoraInicio(setPartidoDTO.getHoraInicio());
        setPartido.setHoraTermino(setPartidoDTO.getHoraTermino());
        setPartido.setPuntajeA(setPartidoDTO.getPuntajeA());
        setPartido.setPuntajeB(setPartidoDTO.getPuntajeB());
        setPartido.setNumeroSet(setPartidoDTO.getNumeroSet());

        Partido partido = (setPartido.getPartido() != null) ? partidoMapper.toEntity(setPartidoDTO.getPartido()) : null;
        setPartido.setPartido(partido);   

        return setPartido;
    }
}
