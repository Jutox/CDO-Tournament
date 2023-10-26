package com.example.cdo_tournament_backend.service;

import jakarta.transaction.Transactional;

import java.util.List;

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
    public void createEquipo(Equipo equipo) {
        equipoRepository.save(equipo);
    }
}