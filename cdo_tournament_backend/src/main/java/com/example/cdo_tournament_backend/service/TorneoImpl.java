package com.example.cdo_tournament_backend.service;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cdo_tournament_backend.model.Torneo;
import com.example.cdo_tournament_backend.repository.TorneoRepository;


@Service
@Transactional
public class TorneoImpl implements TorneoService{

    @Autowired
    private TorneoRepository torneoRepository;

    @Override
    public List<Torneo> getAllTorneos() {
        return torneoRepository.findAll();
    }

    @Override
    public Torneo createTorneo(Torneo torneo) {
        return torneoRepository.save(torneo);
    }

    @Override
    public Torneo getTorneoById(int id) {
        Optional<Torneo> torneo = torneoRepository.findById(id);
        return torneo.orElse(null);
    }

    @Override
    public Torneo updateTorneo(int id, Torneo torneo) {
        Torneo existente = getTorneoById(id);
        if(existente!=null){
            existente.setNombre(torneo.getNombre());
            existente.setLugar(torneo.getLugar());
            existente.setFechaInicio(torneo.getFechaInicio());
            existente.setFechaTermino(torneo.getFechaTermino());
            existente.setPartidos(torneo.getPartidos());
            return torneoRepository.save(existente);
        }else{
            return null;
        }
    }

    @Override
    public void deleteTorneo(int id) {
        torneoRepository.deleteById(id);
    }

}