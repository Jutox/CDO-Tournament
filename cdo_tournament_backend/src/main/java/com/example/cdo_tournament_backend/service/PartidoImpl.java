package com.example.cdo_tournament_backend.service;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cdo_tournament_backend.model.Equipo;
import com.example.cdo_tournament_backend.model.Partido;
import com.example.cdo_tournament_backend.repository.PartidoRepository;


@Service
@Transactional
public class PartidoImpl implements PartidoService{

    @Autowired
    private PartidoRepository partidoRepository;

    @Override
    public List<Partido> getAllPartidos() {
        return partidoRepository.findAll();
    }

    @Override
    public Partido createPartido(Partido partido) {
        return partidoRepository.save(partido);
    }

    @Override
    public Partido getPartidoById(int id) {
        Optional<Partido> partido = partidoRepository.findById(id);
        return partido.orElse(null);
    }

    @Override
    public Partido updatePartido(int id, Partido partido) {
    Partido existente = getPartidoById(id);
    if(existente!=null){
            existente.setNombreCompeticion(partido.getNombreCompeticion());
            existente.setCategoria(partido.getCategoria());
            existente.setDivision(partido.getDivision());
            existente.setCiudad(partido.getCiudad());
            existente.setCodigoPais(partido.getCodigoPais());
            existente.setRecinto(partido.getRecinto());
            existente.setFase(partido.getFase());
            existente.setFecha(partido.getFecha());
            existente.setHora(partido.getHora());
            existente.setNumeroPartido(partido.getNumeroPartido());
            existente.setTorneo(partido.getTorneo());
            existente.setListaJugadoresPartidos(partido.getListaJugadoresPartidos());
            existente.setSets(partido.getSets());
            return partidoRepository.save(existente);
        }else{
            return null;
        }
    }

    @Override
    public void deletePartido(int id) {
        partidoRepository.deleteById(id);
    }

    

}