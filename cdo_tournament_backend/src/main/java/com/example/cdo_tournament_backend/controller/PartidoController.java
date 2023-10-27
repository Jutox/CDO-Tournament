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

        @GetMapping("/{id}")
    public ResponseEntity<Partido> getPartidoById(@PathVariable int id) {
        try {
            Partido partido = partidoService.getPartidoById(id);
    
            if (partido != null) {
                return new ResponseEntity<>(partido, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 - Internal Server Error
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Partido> updatePartido(@PathVariable int id, @RequestBody Partido partidoActual) {
        try{
            Partido partidoBD = partidoService.getPartidoById(id);
            if (partidoBD != null) {
                Partido partido = partidoService.updatePartido(id, partidoActual);
                return new ResponseEntity<>(partido, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        }catch (Exception ev){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPartido(@PathVariable int id) {
        try {
            Partido partidoBD = partidoService.getPartidoById(id);
            if (partidoBD != null) {
                partidoService.deletePartido(id);
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