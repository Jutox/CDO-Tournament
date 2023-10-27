package com.example.cdo_tournament_backend.service;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cdo_tournament_backend.model.Equipo;
import com.example.cdo_tournament_backend.repository.EquipoRepository;


@Service
@Transactional
public class EquipoImpl implements EquipoService{

    @Autowired
    private EquipoRepository equipoRepository;

    @Override
    public List<Equipo> getAllEquipos() {
        return equipoRepository.findAll();
    }

    @Override
    public Equipo createEquipo(Equipo equipo) {
        return equipoRepository.save(equipo);
    }

    @Override
    public Equipo getEquipoById(int id) {
        Optional<Equipo> equipo = equipoRepository.findById(id);
        return equipo.orElse(null);
    }

    @Override
    public Equipo updateEquipo(int id, Equipo equipo) {
        Equipo existente = getEquipoById(id);
        if(existente!=null){
            existente.setNombreEquipo(equipo.getNombreEquipo());
            existente.setNombreEntrenador(equipo.getNombreEntrenador());
            existente.setListaJugadoresPartidos(equipo.getListaJugadoresPartidos());
            return equipoRepository.save(existente);
        }else{
            return null;
        }
    }

    @Override
    public void deleteEquipo(int id) {
        equipoRepository.deleteById(id);
    }

}