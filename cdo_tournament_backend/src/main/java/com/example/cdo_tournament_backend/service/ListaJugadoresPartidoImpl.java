package com.example.cdo_tournament_backend.service;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cdo_tournament_backend.dto.ListaJugadoresPartidoDTO;
import com.example.cdo_tournament_backend.mapper.ListaJugadoresPartidoMapper;
import com.example.cdo_tournament_backend.model.ListaJugadoresPartido;
import com.example.cdo_tournament_backend.repository.ListaJugadoresPartidoRepository;


@Service
@Transactional
public class ListaJugadoresPartidoImpl implements ListaJugadoresPartidoService{

    @Autowired
    private ListaJugadoresPartidoRepository listaJugadoresPartidoRepository; // Repositorio para acceder a los datos de las listas de jugadores de partido

    @Autowired
    private ListaJugadoresPartidoMapper listaJugadoresPartidoMapper; // Mapeador para convertir entre entidades y DTOs

    @Override
    public List<ListaJugadoresPartidoDTO> getAllListasJugadoresPartido() {
        List<ListaJugadoresPartido> listasDB = listaJugadoresPartidoRepository.findAll();
        List<ListaJugadoresPartidoDTO> retornoDTO = listasDB.stream()
                .map(listaJugadoresPartidoMapper::toDTO)
                .collect(Collectors.toList());
        return retornoDTO;
    }

    @Override
    public ListaJugadoresPartidoDTO createListaJugadoresPartido(ListaJugadoresPartidoDTO listaJugadoresPartidoDTO) {
        // Convierte el DTO a una entidad ListaJugadoresPartido usando el ListaJugadoresPartidoMapper
        ListaJugadoresPartido listaJugadoresPartido = listaJugadoresPartidoMapper.toEntity(listaJugadoresPartidoDTO);
        // Guarda la entidad en la base de datos
        listaJugadoresPartido = listaJugadoresPartidoRepository.save(listaJugadoresPartido);
        // Convierte la entidad nuevamente a DTO y devuélvela
        return listaJugadoresPartidoMapper.toDTO(listaJugadoresPartido);
    }

    @Override
    public ListaJugadoresPartidoDTO getListaJugadoresPartidoById(int id) {
        Optional<ListaJugadoresPartido> listaJugadoresPartido = listaJugadoresPartidoRepository.findById(id);
        return listaJugadoresPartido.map(listaJugadoresPartidoMapper::toDTO).orElse(null);
    }

    @Override
    public ListaJugadoresPartidoDTO updateListaJugadoresPartido(int id, ListaJugadoresPartidoDTO listaJugadoresPartidoDTO) {
        ListaJugadoresPartido nuevo = listaJugadoresPartidoMapper.toEntity(listaJugadoresPartidoDTO);
        ListaJugadoresPartido existente = listaJugadoresPartidoRepository.findById(id).orElse(null);
        if (existente != null) {
            existente.setEquipo(nuevo.getEquipo());
            existente.setPartido(nuevo.getPartido());
            existente = listaJugadoresPartidoRepository.save(existente);
            // Convierte la entidad nuevamente a DTO y devuélvela
            return listaJugadoresPartidoMapper.toDTO(existente);
        } else {
            return null; // Retorna null si la lista de jugadores de partido no existe
        }
    }

    @Override
    public void deleteListaJugadoresPartido(int id) {
        listaJugadoresPartidoRepository.deleteById(id); // Elimina una lista de jugadores de partido por su ID
    }
}