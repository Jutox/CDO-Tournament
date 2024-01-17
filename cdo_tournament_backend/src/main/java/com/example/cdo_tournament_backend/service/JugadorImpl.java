package com.example.cdo_tournament_backend.service;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cdo_tournament_backend.dto.JugadorDTO;
import com.example.cdo_tournament_backend.mapper.JugadorMapper;
import com.example.cdo_tournament_backend.model.Jugador;
import com.example.cdo_tournament_backend.repository.JugadorRepository;


@Service
@Transactional
public class JugadorImpl implements JugadorService {

    @Autowired
    private JugadorRepository jugadorRepository;

    @Autowired
    private JugadorMapper jugadorMapper;

    @Override
    public List<JugadorDTO> getAllJugadores() {
        List<Jugador> jugadoresDB = jugadorRepository.findAll();
        List<JugadorDTO> retornoDTO = jugadoresDB.stream()
                .map(jugadorMapper::toDTO)
                .collect(Collectors.toList());
        return retornoDTO;
    } 

    @Override
    public JugadorDTO createJugador(JugadorDTO jugadorDTO) {
        Jugador jugador = jugadorMapper.toEntity(jugadorDTO);
        Jugador retorno = jugadorRepository.save(jugador);
        return jugadorMapper.toDTO(retorno);
    }

    @Override
    public JugadorDTO getJugadorById(int id) {
        Optional<Jugador> jugador = jugadorRepository.findById(id);
        return jugador.map(jugadorMapper::toDTO).orElse(null);
    }

    @Override
    public JugadorDTO getJugadorByEmail(String email) {
        Optional<Jugador> jugador = jugadorRepository.findByEmail(email);
        return jugador.map(jugadorMapper::toDTO).orElse(null);
    }

    @Override
    public JugadorDTO updateJugador(int id, JugadorDTO jugadorDTO) {
        Jugador nuevo = jugadorMapper.toEntity(jugadorDTO);
        Jugador existente = jugadorRepository.findById(id).orElse(null);
        if (existente != null) {
            // Mapear los atributos de JugadorDTO a Jugador
            existente.setNombres(nuevo.getNombres());
            existente.setApellidoPaterno(nuevo.getApellidoPaterno());
            existente.setApellidoMaterno(nuevo.getApellidoMaterno());
            existente.setEstatura(nuevo.getEstatura());
            existente.setPeso(nuevo.getPeso());
            existente.setAlcanceMano(nuevo.getAlcanceMano());
            existente.setAlcanceBloqueo(nuevo.getAlcanceBloqueo());
            existente.setEmail(nuevo.getEmail());
            existente.setFechaNacimiento(nuevo.getFechaNacimiento());
            existente.setRut(nuevo.getRut());
            existente.setGenero(nuevo.getGenero());
            existente.setTelefono(nuevo.getTelefono());
            existente.setPartidos(nuevo.getPartidos());

            Jugador retorno = jugadorRepository.save(existente);
            return jugadorMapper.toDTO(retorno);
        } else {
            return null;
        }
    }

    @Override
    public void deleteJugador(int id) {
        jugadorRepository.deleteById(id);
    }
}