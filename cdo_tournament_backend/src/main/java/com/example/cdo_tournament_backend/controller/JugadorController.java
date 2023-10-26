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

import com.example.cdo_tournament_backend.model.Equipo;
import com.example.cdo_tournament_backend.model.Jugador;
import com.example.cdo_tournament_backend.service.JugadorImpl;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/jugador")
public class JugadorController {

     @Autowired()
    private JugadorImpl jugadorService;
    
    @GetMapping("/jugadores")
    public ResponseEntity<List<Jugador>> getJugadores(){
        try{
            List<Jugador> list = jugadorService.getAlljugadores();
            return  new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        }catch (Exception ev){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping()
    public ResponseEntity<Jugador> createJugador(@RequestBody Jugador jugador){
        try{
            Jugador retorno = jugadorService.createJugador(jugador);
            return  new ResponseEntity<>(retorno, HttpStatus.ACCEPTED);
        }catch (Exception ev){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    } 

    @GetMapping("/{id}")
    public ResponseEntity<Jugador> getJugadorById(@PathVariable int id) {
        try {
            Jugador jugador = jugadorService.getJugadorById(id);
    
            if (jugador != null) {
                return new ResponseEntity<>(jugador, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 - Internal Server Error
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Jugador> updateJugador(@PathVariable int id, @RequestBody Jugador jugadorActual) {
        try{
            Jugador jugadorBD = jugadorService.getJugadorById(id);
            if (jugadorBD != null) {
                Jugador jugador = jugadorService.updateJugador(id, jugadorActual);
                return new ResponseEntity<>(jugador, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        }catch (Exception ev){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarJugador(@PathVariable int id) {
        try {
            Jugador jugadorBD = jugadorService.getJugadorById(id);
            if (jugadorBD != null) {
                jugadorService.deleteJugador(id);
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