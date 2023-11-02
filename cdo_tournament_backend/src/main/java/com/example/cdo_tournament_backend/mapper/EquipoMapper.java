package com.example.cdo_tournament_backend.mapper;

import org.springframework.stereotype.Component;

import com.example.cdo_tournament_backend.dto.EquipoDTO;
import com.example.cdo_tournament_backend.model.Equipo;

@Component   
public class EquipoMapper {
    
    // Método para convertir un Equipo a EquipoDTO
    public EquipoDTO toDTO(Equipo equipo) {
        EquipoDTO equipoDTO = new EquipoDTO();
        equipoDTO.setIdEquipo(equipo.getIdEquipo());
        equipoDTO.setNombreEquipo(equipo.getNombreEquipo());
        equipoDTO.setNombreEntrenador(equipo.getNombreEntrenador()); 
        // Mapear otros atributos si es necesario
        return equipoDTO;
    }

    // Método para convertir un EquipoDTO a Equipo
    public Equipo toEntity(EquipoDTO equipoDTO) {
        Equipo equipo = new Equipo();
        equipo.setIdEquipo(equipoDTO.getIdEquipo());
        equipo.setNombreEquipo(equipoDTO.getNombreEquipo());
        equipo.setNombreEntrenador(equipoDTO.getNombreEntrenador());
        // Mapear otros atributos si es necesario
        return equipo;
    }
}