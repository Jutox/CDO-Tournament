package com.example.cdo_tournament_backend.service;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cdo_tournament_backend.model.Jugador;
import com.example.cdo_tournament_backend.repository.JugadorRepository;


@Service
@Transactional
public class JugadorImpl implements JugadorService{

    @Autowired
    private JugadorRepository jugadorRepository;

   @Override
    public List<Jugador> getAlljugadores(){
    return jugadorRepository.findAll();
    }
    
    @Override
    public Jugador createJugador(Jugador jugador){
       return jugadorRepository.save(jugador);
    }

    @Override
    public Jugador getJugadorById(int id) {
        Optional<Jugador> jugador = jugadorRepository.findById(id);
        return jugador.orElse(null);     
    }

    @Override
    public Jugador updateJugador(int id, Jugador jugador) {
        Jugador existente = getJugadorById(id);
        if(existente!=null){
            existente.setNombres(jugador.getNombres());
            existente.setApellidosPaterno(jugador.getApellidosPaterno());
            existente.setApellidoMaterno(jugador.getApellidoMaterno());
            existente.setEstatura(jugador.getEstatura());
            existente.setPeso(jugador.getPeso());
            existente.setAlcanceMano(jugador.getAlcanceMano());
            existente.setAlcanceBloqueo(jugador.getAlcanceBloqueo());
            existente.setEmail(jugador.getEmail());
            existente.setFechaNacimiento(jugador.getFechaNacimiento());
            existente.setRut(jugador.getRut());
            existente.setSexo(jugador.getSexo());
            existente.setTelefono(jugador.getTelefono());
            return jugadorRepository.save(existente);
        }else{
            return null;
        }
    }

    @Override
    public void deleteJugador(int id) {
        jugadorRepository.deleteById(id);
    }
}