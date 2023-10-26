package com.example.cdo_tournament_backend.controller;

import com.example.cdo_tournament_backend.model.Equipo;
import com.example.cdo_tournament_backend.service.EquipoImpl;

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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/equipo")
public class EquipoController {

   @Autowired
   private EquipoImpl equipoService;

       @GetMapping("/equipos")
    public ResponseEntity<List<Equipo>> getEquipos(){
        try{
            List<Equipo> list = equipoService.getAllEquipos();
            return  new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        }catch (Exception ev){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping()
    public ResponseEntity<Equipo> createEquipo(@RequestBody Equipo equipo){
        try{
            equipoService.createEquipo(equipo);
            return  new ResponseEntity<>(equipo, HttpStatus.ACCEPTED);
        }catch (Exception ev){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    } 
}