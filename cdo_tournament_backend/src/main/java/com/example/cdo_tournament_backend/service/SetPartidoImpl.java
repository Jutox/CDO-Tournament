package com.example.cdo_tournament_backend.service;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cdo_tournament_backend.dto.SetPartidoDTO;
import com.example.cdo_tournament_backend.mapper.SetPartidoMapper;
import com.example.cdo_tournament_backend.model.SetPartido;
import com.example.cdo_tournament_backend.repository.SetPartidoRepository;


@Service
@Transactional
public class SetPartidoImpl implements SetPartidoService{

    @Autowired
    private SetPartidoRepository setPartidoRepository; // Repositorio para acceder a los datos de los sets de partido

    @Autowired
    private SetPartidoMapper setPartidoMapper; // Mapeador para convertir entre entidades y DTOs

    @Override
    public List<SetPartidoDTO> getAllSetsPartido() {
        List<SetPartido> setsDB = setPartidoRepository.findAll();
        List<SetPartidoDTO> retornoDTO = setsDB.stream()
                .map(setPartidoMapper::toDTO)
                .collect(Collectors.toList());
        return retornoDTO;
    }

    @Override
    public SetPartidoDTO createSetPartido(SetPartidoDTO setPartidoDTO) {
        // Convierte el DTO a una entidad SetPartido usando el SetPartidoMapper
        SetPartido setPartido = setPartidoMapper.toEntity(setPartidoDTO);
        // Guarda la entidad en la base de datos
        setPartido = setPartidoRepository.save(setPartido);
        // Convierte la entidad nuevamente a DTO y devuélvela
        return setPartidoMapper.toDTO(setPartido);
    }

    @Override
    public SetPartidoDTO getSetPartidoById(int id) {
        Optional<SetPartido> setPartido = setPartidoRepository.findById(id);
        return setPartido.map(setPartidoMapper::toDTO).orElse(null);
    }

    @Override
    public SetPartidoDTO updateSetPartido(int id, SetPartidoDTO setPartidoDTO) {
        SetPartido nuevo = setPartidoMapper.toEntity(setPartidoDTO);
        SetPartido existente = setPartidoRepository.findById(id).orElse(null);
        if (existente != null) {
            // Actualiza los atributos de la entidad con los valores del DTO
            existente.setHoraInicio(nuevo.getHoraInicio());
            existente.setHoraTermino(nuevo.getHoraTermino());
            existente.setPuntajeA(nuevo.getPuntajeA());
            existente.setPuntajeB(nuevo.getPuntajeB());
            existente.setNumeroSet(nuevo.getNumeroSet());
            existente.setPartido(nuevo.getPartido());
            existente.setEventos(nuevo.getEventos());

            // Guarda la entidad actualizada en la base de datos
            existente = setPartidoRepository.save(existente);
            // Convierte la entidad nuevamente a DTO y devuélvela
            return setPartidoMapper.toDTO(existente);
        } else {
            return null; // Retorna null si el set de partido no existe
        }
    }

    @Override
    public void deleteSetPartido(int id) {
        setPartidoRepository.deleteById(id); // Elimina un set de partido por su ID
    }

    @Override
    public List<SetPartidoDTO> getSetsByPartido(int idPartido) {
        List<SetPartido> setsDB = setPartidoRepository.findSetsByPartido(idPartido);
        List<SetPartidoDTO> retornoDTO = setsDB.stream()
                .map(setPartidoMapper::toDTO)
                .collect(Collectors.toList());
        return retornoDTO;
    }
}