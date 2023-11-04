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

import com.example.cdo_tournament_backend.dto.JugadorDTO;
import com.example.cdo_tournament_backend.service.JugadorImpl;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/jugador")
public class JugadorController {

    @Autowired
    private JugadorImpl jugadorService;
    
    @GetMapping("/jugadores")
    public ResponseEntity<List<JugadorDTO>> getJugadores() {
        try {
            List<JugadorDTO> list = jugadorService.getAllJugadores();
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<JugadorDTO> createJugador(@RequestBody JugadorDTO jugadorDTO) {
        try {
            JugadorDTO retorno = jugadorService.createJugador(jugadorDTO);
            return new ResponseEntity<>(retorno, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } 

    @GetMapping("/{id}")
    public ResponseEntity<JugadorDTO> getJugadorById(@PathVariable int id) {
        try {
            JugadorDTO jugador = jugadorService.getJugadorById(id);
            if (jugador != null) {
                return new ResponseEntity<>(jugador, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<JugadorDTO> updateJugador(@PathVariable int id, @RequestBody JugadorDTO jugadorDTO) {
        try {
            JugadorDTO jugadorBD = jugadorService.getJugadorById(id);
            if (jugadorBD != null) {
                JugadorDTO jugador = jugadorService.updateJugador(id, jugadorDTO);
                return new ResponseEntity<>(jugador, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarJugador(@PathVariable int id) {
        try {
            JugadorDTO jugadorBD = jugadorService.getJugadorById(id);
            if (jugadorBD != null) {
                jugadorService.deleteJugador(id);
                return ResponseEntity.noContent().build(); // Responde con 204 (No Content) en caso de éxito.
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}