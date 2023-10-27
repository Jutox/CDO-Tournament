package com.example.cdo_tournament_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cdo_tournament_backend.model.Torneo;
import com.example.cdo_tournament_backend.service.TorneoImpl;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/torneo")
public class TorneoController {

       @Autowired
   private TorneoImpl torneoService;

    @GetMapping("/torneos")
    public ResponseEntity<List<Torneo>> getTorneos(){
        try{
            List<Torneo> list = torneoService.getAllTorneos();
            return  new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        }catch (Exception ev){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping()
    public ResponseEntity<Torneo> createTorneo(@RequestBody Torneo torneo){
        try{
            Torneo retorno = torneoService.createTorneo(torneo);
            return  new ResponseEntity<>(retorno, HttpStatus.ACCEPTED);
        }catch (Exception ev){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    } 

    @GetMapping("/{id}")
    public ResponseEntity<Torneo> getTorneoById(@PathVariable int id) {
        try {
            Torneo torneo = torneoService.getTorneoById(id);
    
            if (torneo != null) {
                return new ResponseEntity<>(torneo, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 - Internal Server Error
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Torneo> updateTorneo(@PathVariable int id, @RequestBody Torneo torneoActual) {
        try{
            Torneo torneoBD = torneoService.getTorneoById(id);
            if (torneoBD != null) {
                Torneo torneo = torneoService.updateTorneo(id, torneoActual);
                return new ResponseEntity<>(torneo, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        }catch (Exception ev){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEquipo(@PathVariable int id) {
        try {
            Torneo torneoBD = torneoService.getTorneoById(id);
            if (torneoBD != null) {
                torneoService.deleteTorneo(id);
                return ResponseEntity.noContent().build(); // Responde con 204 (No Content) en caso de éxito.
            } else {
                // El equipo no existe, responde con un código de estado 404 (Not Found).
                return ResponseEntity.notFound().build();
            }
        } catch (Exception ev) {
            ev.printStackTrace(); // Manejo de excepciones generales
            // Puedes realizar acciones de manejo adicionales aquí.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Responde con un código de estado 500 (Internal Server Error) en caso de error general.
        }
    }
}