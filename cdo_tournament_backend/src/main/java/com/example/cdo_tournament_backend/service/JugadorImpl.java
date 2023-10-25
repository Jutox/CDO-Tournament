package com.example.cdo_tournament_backend.service;

import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

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

}