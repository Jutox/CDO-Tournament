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

import com.example.cdo_tournament_backend.dto.JugadorPartidoDTO;
import com.example.cdo_tournament_backend.service.JugadorPartidoImpl;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/jugadorPartido")
public class JugadorPartidoController {

    @Autowired
    private JugadorPartidoImpl jugadorPartidoService;

    @GetMapping("/jugadoresPartidos")
    public ResponseEntity<List<JugadorPartidoDTO>> getJugadoresPartido() {
        try {
            List<JugadorPartidoDTO> list = jugadorPartidoService.getAllJugadoresPartido();
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<JugadorPartidoDTO> createJugadorPartido(@RequestBody JugadorPartidoDTO jugadorPartidoDTO) {
        try {
            JugadorPartidoDTO retorno = jugadorPartidoService.createJugadorPartido(jugadorPartidoDTO);
            return new ResponseEntity<>(retorno, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<JugadorPartidoDTO> getJugadorPartidoById(@PathVariable int id) {
        try {
            JugadorPartidoDTO jugadorPartidoDTO = jugadorPartidoService.getJugadorPartidoById(id);

            if (jugadorPartidoDTO != null) {
                return new ResponseEntity<>(jugadorPartidoDTO, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<JugadorPartidoDTO> updateJugadorPartido(@PathVariable int id, @RequestBody JugadorPartidoDTO jugadorPartidoDTO) {
        try {
            JugadorPartidoDTO jugadorPartidoDTOExistente = jugadorPartidoService.getJugadorPartidoById(id);
            if (jugadorPartidoDTOExistente != null) {
                JugadorPartidoDTO jugadorPartidoActualizado = jugadorPartidoService.updateJugadorPartido(id, jugadorPartidoDTO);
                return new ResponseEntity<>(jugadorPartidoActualizado, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarJugadorPartido(@PathVariable int id) {
        try {
            JugadorPartidoDTO jugadorPartidoDTOExistente = jugadorPartidoService.getJugadorPartidoById(id);
            if (jugadorPartidoDTOExistente != null) {
                jugadorPartidoService.deleteJugadorPartido(id);
                return ResponseEntity.noContent().build(); // Responde con 204 (No Content) en caso de éxito.
            } else {
                return ResponseEntity.notFound().build(); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones generales
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 - Internal Server Error
        }
    }
}