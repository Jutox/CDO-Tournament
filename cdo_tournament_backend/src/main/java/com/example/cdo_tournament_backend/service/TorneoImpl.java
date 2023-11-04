package com.example.cdo_tournament_backend.service;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cdo_tournament_backend.dto.TorneoDTO;
import com.example.cdo_tournament_backend.mapper.TorneoMapper;
import com.example.cdo_tournament_backend.model.Torneo;
import com.example.cdo_tournament_backend.repository.TorneoRepository;


@Service
@Transactional
public class TorneoImpl implements TorneoService{

    @Autowired
    private TorneoRepository torneoRepository; // Repositorio para acceder a los datos de los torneos

    @Autowired
    private TorneoMapper torneoMapper; // Mapeador para convertir entre entidades y DTOs

    @Override
    public List<TorneoDTO> getAllTorneos() {
        List<Torneo> torneosDB = torneoRepository.findAll();
        List<TorneoDTO> retornoDTO = torneosDB.stream()
                .map(torneoMapper::toDTO)
                .collect(Collectors.toList());
        return retornoDTO;
    }

    @Override
    public TorneoDTO createTorneo(TorneoDTO torneoDTO) {
        // Convierte el DTO a una entidad Torneo usando el TorneoMapper
        Torneo torneo = torneoMapper.toEntity(torneoDTO);
        // Guarda la entidad en la base de datos
        torneo = torneoRepository.save(torneo);
        // Convierte la entidad nuevamente a DTO y devuélvela
        return torneoMapper.toDTO(torneo);
    }

    @Override
    public TorneoDTO getTorneoById(int id) {
        Optional<Torneo> torneo = torneoRepository.findById(id);
        return torneo.map(torneoMapper::toDTO).orElse(null);
    }

    @Override
    public TorneoDTO updateTorneo(int id, TorneoDTO torneoDTO) {
        Torneo nuevo = torneoMapper.toEntity(torneoDTO);
        Torneo existente = torneoRepository.findById(id).orElse(null);
        if (existente != null) {
            existente.setNombre(nuevo.getNombre());
            existente.setLugar(nuevo.getLugar());
            existente.setFechaInicio(nuevo.getFechaInicio());
            existente.setFechaTermino(nuevo.getFechaTermino());
            existente.setPartidos(nuevo.getPartidos());
            existente = torneoRepository.save(existente);
            // Convierte la entidad nuevamente a DTO y devuélvela
            return torneoMapper.toDTO(existente);
        } else {
            return null; // Retorna null si el torneo no existe
        }
    }

    @Override
    public void deleteTorneo(int id) {
        torneoRepository.deleteById(id); // Elimina un torneo por su ID
    }
}