package com.example.cdo_tournament_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cdo_tournament_backend.model.Partido;
import com.example.cdo_tournament_backend.service.PartidoImpl;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/partido")
public class PartidoController {

    @Autowired
    private PartidoImpl partidoService;

    @GetMapping("/partidos")
    public ResponseEntity<List<Partido>> getPartidos(){
        try{
            List<Partido> list = partidoService.getAllPartidos();
            return  new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        }catch (Exception ev){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @PostMapping()
    public ResponseEntity<Partido> createPartido(@RequestBody Partido partido){
        try{
            partidoService.createPartido(partido);
            return new ResponseEntity<>(partido, HttpStatus.ACCEPTED);
        }catch (Exception ev){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}