package com.example.cdo_tournament_backend.service;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cdo_tournament_backend.dto.JugadorPartidoDTO;
import com.example.cdo_tournament_backend.mapper.JugadorPartidoMapper;
import com.example.cdo_tournament_backend.model.JugadorPartido;
import com.example.cdo_tournament_backend.repository.JugadorPartidoRepository;


@Service
@Transactional
public class JugadorPartidoImpl implements JugadorPartidoService{

    @Autowired
    private JugadorPartidoRepository jugadorPartidoRepository; // Repositorio para acceder a los datos de los jugadores de partido

    @Autowired
    private JugadorPartidoMapper jugadorPartidoMapper;

    @Override
    public List<JugadorPartidoDTO> getAllJugadoresPartido() {
        List<JugadorPartido> jugadoresPartidoDB = jugadorPartidoRepository.findAll();
        List<JugadorPartidoDTO> retornoDTO = jugadoresPartidoDB.stream()
                .map(jugadorPartidoMapper::toDTO)
                .collect(Collectors.toList());
        return retornoDTO;
    }

    @Override
    public JugadorPartidoDTO createJugadorPartido(JugadorPartidoDTO jugadorPartidoDTO) {
        // Convierte el DTO a una entidad JugadorPartido usando el JugadorPartidoMapper
        JugadorPartido jugadorPartido = jugadorPartidoMapper.toEntity(jugadorPartidoDTO);
        // Guarda la entidad en la base de datos
        jugadorPartido = jugadorPartidoRepository.save(jugadorPartido);
        // Convierte la entidad nuevamente a DTO y devuélvela
        return jugadorPartidoMapper.toDTO(jugadorPartido);
    }

    @Override
    public JugadorPartidoDTO getJugadorPartidoById(int id) {
        Optional<JugadorPartido> jugadorPartido = jugadorPartidoRepository.findById(id);
        return jugadorPartido.map(jugadorPartidoMapper::toDTO).orElse(null);
    }

    @Override
    public JugadorPartidoDTO updateJugadorPartido(int id, JugadorPartidoDTO jugadorPartidoDTO) {
        JugadorPartido nuevo = jugadorPartidoMapper.toEntity(jugadorPartidoDTO);
        JugadorPartido existente = jugadorPartidoRepository.findById(id).orElse(null);
        if (existente != null) {
            // Actualiza los atributos de la entidad con los valores del DTO
            existente.setCapitan(nuevo.isCapitan());
            existente.setNumeroCamiseta(nuevo.getNumeroCamiseta());
            existente.setJugador(nuevo.getJugador());
            existente.setListaJugadoresPartido(nuevo.getListaJugadoresPartido());
            existente.setEventos(nuevo.getEventos());

            // Guarda la entidad actualizada en la base de datos
            existente = jugadorPartidoRepository.save(existente);
            // Convierte la entidad nuevamente a DTO y devuélvela
            return jugadorPartidoMapper.toDTO(existente);
        } else {
            return null; // Retorna null si el jugador de partido no existe
        }
    }

    @Override
    public void deleteJugadorPartido(int id) {
        jugadorPartidoRepository.deleteById(id); // Elimina un jugador de partido por su ID
    }
}
