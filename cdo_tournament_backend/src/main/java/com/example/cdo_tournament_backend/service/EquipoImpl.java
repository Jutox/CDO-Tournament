package com.example.cdo_tournament_backend.service;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cdo_tournament_backend.dto.EquipoDTO;
import com.example.cdo_tournament_backend.mapper.EquipoMapper;
import com.example.cdo_tournament_backend.model.Equipo;
import com.example.cdo_tournament_backend.repository.EquipoRepository;


@Service
@Transactional
public class EquipoImpl implements EquipoService{

    @Autowired
    private EquipoRepository equipoRepository;

    @Autowired
    private EquipoMapper equipoMapper;

    @Override
    public List<EquipoDTO> getAllEquipos() {
        List<Equipo> equiposDB = equipoRepository.findAll();
        List<EquipoDTO> retornoDTO = equiposDB.stream()
                .map(equipoMapper::toDTO)
                .collect(Collectors.toList());
        return retornoDTO;
    }

    @Override
    public EquipoDTO createEquipo(EquipoDTO equipoDTO) {
        // Convierte el DTO a una entidad Equipo usando el EquipoMapper
        Equipo equipo = equipoMapper.toEntity(equipoDTO);
        // Guarda la entidad en la base de datos
        equipo = equipoRepository.save(equipo);
        // Convierte la entidad nuevamente a DTO y devuélvela
        return equipoMapper.toDTO(equipo);
    }

    @Override
    public EquipoDTO getEquipoById(int id) {
        Optional<Equipo> equipo = equipoRepository.findById(id);
        return equipo.map(equipoMapper::toDTO).orElse(null);
    }

    @Override
    public EquipoDTO updateEquipo(int id, EquipoDTO equipoDTO) {
        Equipo nuevo = equipoMapper.toEntity(equipoDTO);
        Equipo existente = equipoRepository.findById(id).orElse(null);
        if (existente != null) {
            // Actualiza los atributos de la entidad con los valores del DTO
            existente.setNombreEquipo(nuevo.getNombreEquipo());
            existente.setNombreEntrenador(nuevo.getNombreEntrenador());
            existente.setListaJugadoresPartidos(nuevo.getListaJugadoresPartidos());

            // Guarda la entidad actualizada en la base de datos
            existente = equipoRepository.save(existente);
            // Convierte la entidad nuevamente a DTO y devuélvela
            return equipoMapper.toDTO(existente);
        } else {
            return null;
        }
    }

    @Override
    public void deleteEquipo(int id) {
        equipoRepository.deleteById(id);
    }

}