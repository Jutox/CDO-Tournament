package com.example.cdo_tournament_backend.service;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cdo_tournament_backend.dto.PartidoDTO;
import com.example.cdo_tournament_backend.mapper.PartidoMapper;
import com.example.cdo_tournament_backend.model.Partido;
import com.example.cdo_tournament_backend.repository.PartidoRepository;


@Service
@Transactional
public class PartidoImpl implements PartidoService{

    @Autowired
    private PartidoRepository partidoRepository; // Repositorio para acceder a los datos de los partidos

    @Autowired
    private PartidoMapper partidoMapper; // Mapeador para convertir entre entidades y DTOs

    @Override
    public List<PartidoDTO> getAllPartidos() {
        List<Partido> partidosDB = partidoRepository.findAll();
        List<PartidoDTO> retornoDTO = partidosDB.stream()
                .map(partidoMapper::toDTO)
                .collect(Collectors.toList());
        return retornoDTO;
    }

    @Override
    public PartidoDTO createPartido(PartidoDTO partidoDTO) {
        // Convierte el DTO a una entidad Partido usando el PartidoMapper
        Partido partido = partidoMapper.toEntity(partidoDTO);
        // Guarda la entidad en la base de datos
        partido = partidoRepository.save(partido);
        // Convierte la entidad nuevamente a DTO y devuélvela
        return partidoMapper.toDTO(partido);
    }

    @Override
    public PartidoDTO getPartidoById(int id) {
        Optional<Partido> partido = partidoRepository.findById(id);
        return partido.map(partidoMapper::toDTO).orElse(null);
    }

    @Override
    public PartidoDTO updatePartido(int id, PartidoDTO partidoDTO) {
        Partido nuevo = partidoMapper.toEntity(partidoDTO);
        Partido existente = partidoRepository.findById(id).orElse(null);
        if (existente != null) {
            // Actualiza los atributos de la entidad con los valores del DTO
            existente.setNombreCompeticion(nuevo.getNombreCompeticion());
            existente.setCiudad(nuevo.getCiudad());
            existente.setCodigoPais(nuevo.getCodigoPais());
            existente.setRecinto(nuevo.getRecinto());
            existente.setFase(nuevo.getFase());
            existente.setNumeroPartido(nuevo.getNumeroPartido());
            existente.setDivision(nuevo.getDivision());
            existente.setCategoria(nuevo.getCategoria());
            existente.setFecha(nuevo.getFecha());
            existente.setHora(nuevo.getHora());
            existente.setTorneo(nuevo.getTorneo());
            existente.setSets(nuevo.getSets());
            existente.setListaJugadoresPartidos(nuevo.getListaJugadoresPartidos());
            // Puedes agregar más actualizaciones aquí si es necesario

            // Guarda la entidad actualizada en la base de datos
            existente = partidoRepository.save(existente);
            // Convierte la entidad nuevamente a DTO y devuélvela
            return partidoMapper.toDTO(existente);
        } else {
            return null; // Retorna null si el partido no existe
        }
    }

    @Override
    public void deletePartido(int id) {
        partidoRepository.deleteById(id); // Elimina un partido por su ID
    }
}