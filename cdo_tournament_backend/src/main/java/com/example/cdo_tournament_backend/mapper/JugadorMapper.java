package com.example.cdo_tournament_backend.mapper;

import org.springframework.stereotype.Component;

import com.example.cdo_tournament_backend.dto.JugadorDTO;
import com.example.cdo_tournament_backend.model.Jugador;
@Component
public class JugadorMapper {
    
    public JugadorDTO toDTO(Jugador jugador) {
        JugadorDTO jugadorDTO = new JugadorDTO();
        jugadorDTO.setIdJugador(jugador.getIdJugador());
        jugadorDTO.setNombres(jugador.getNombres());
        jugadorDTO.setApellidoPaterno(jugador.getApellidoPaterno());
        jugadorDTO.setApellidoMaterno(jugador.getApellidoMaterno());
        jugadorDTO.setRut(jugador.getRut());
        jugadorDTO.setFechaNacimiento(jugador.getFechaNacimiento());
        jugadorDTO.setGenero(jugador.getGenero());
        jugadorDTO.setTelefono(jugador.getTelefono());
        jugadorDTO.setEmail(jugador.getEmail());
        jugadorDTO.setEstatura(jugador.getEstatura() != null ? jugador.getEstatura() : 0); // Si es null, asigna 0
        jugadorDTO.setPeso(jugador.getPeso() != null ? jugador.getPeso() : 0); // Si es null, asigna 0
        jugadorDTO.setAlcanceMano(jugador.getAlcanceMano() != null ? jugador.getAlcanceMano() : 0); // Si es null, asigna 0
        jugadorDTO.setAlcanceBloqueo(jugador.getAlcanceBloqueo() != null ? jugador.getAlcanceBloqueo() : 0); // Si es null, asigna 0
        
        return jugadorDTO;
    }

    public Jugador toEntity(JugadorDTO jugadorDTO) {
        Jugador jugador = new Jugador();
        jugador.setIdJugador(jugadorDTO.getIdJugador());
        jugador.setNombres(jugadorDTO.getNombres());      
        jugador.setApellidoPaterno(jugadorDTO.getApellidoPaterno());
        jugador.setApellidoMaterno(jugadorDTO.getApellidoMaterno());
        jugador.setRut(jugadorDTO.getRut());
        jugador.setFechaNacimiento(jugadorDTO.getFechaNacimiento());
        jugador.setGenero(jugadorDTO.getGenero());
        jugador.setTelefono(jugadorDTO.getTelefono());
        jugador.setEmail(jugadorDTO.getEmail());  
        
        // Mapea la estatura, asigna null si es menor o igual a 0
        if (jugadorDTO.getEstatura() > 0) {
            jugador.setEstatura(jugadorDTO.getEstatura());
        } else {
            jugador.setEstatura(null);
        }
        
        // Mapea el peso, asigna null si es menor o igual a 0
        if (jugadorDTO.getPeso() > 0) {
            jugador.setPeso(jugadorDTO.getPeso());
        } else {
            jugador.setPeso(null);
        }
        
        // Mapea el alcance de la mano, asigna null si es menor o igual a 0
        if (jugadorDTO.getAlcanceMano() > 0) {
            jugador.setAlcanceMano(jugadorDTO.getAlcanceMano());
        } else {
            jugador.setAlcanceMano(null);
        }
        
        // Mapea el alcance de bloqueo, asigna null si es menor o igual a 0
        if (jugadorDTO.getAlcanceBloqueo() > 0) {
            jugador.setAlcanceBloqueo(jugadorDTO.getAlcanceBloqueo());
        } else {
            jugador.setAlcanceBloqueo(null);
        }
        
        return jugador;
    }
}
