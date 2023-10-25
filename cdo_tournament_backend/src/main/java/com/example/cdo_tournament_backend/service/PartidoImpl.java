package com.example.cdo_tournament_backend.service;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public void createPartido(Partido partido) {
        partidoRepository.save(partido);
    }

    

}