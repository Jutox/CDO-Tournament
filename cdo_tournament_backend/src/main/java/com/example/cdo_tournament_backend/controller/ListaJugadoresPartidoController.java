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

import com.example.cdo_tournament_backend.dto.ListaJugadoresPartidoDTO;
import com.example.cdo_tournament_backend.service.ListaJugadoresPartidoImpl;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/listaJugadoresPartido")
public class ListaJugadoresPartidoController {

    
    @Autowired
    private ListaJugadoresPartidoImpl listaJugadoresPartidoService;

    @GetMapping("/listas")
    public ResponseEntity<List<ListaJugadoresPartidoDTO>> getListasJugadoresPartido() {
        try {
            List<ListaJugadoresPartidoDTO> list = listaJugadoresPartidoService.getAllListasJugadoresPartido();
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<ListaJugadoresPartidoDTO> createListaJugadoresPartido(@RequestBody ListaJugadoresPartidoDTO listaJugadoresPartidoDTO) {
        try {
            ListaJugadoresPartidoDTO retorno = listaJugadoresPartidoService.createListaJugadoresPartido(listaJugadoresPartidoDTO);
            return new ResponseEntity<>(retorno, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListaJugadoresPartidoDTO> getListaJugadoresPartidoById(@PathVariable int id) {
        try {
            ListaJugadoresPartidoDTO listaJugadoresPartidoDTO = listaJugadoresPartidoService.getListaJugadoresPartidoById(id);

            if (listaJugadoresPartidoDTO != null) {
                return new ResponseEntity<>(listaJugadoresPartidoDTO, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListaJugadoresPartidoDTO> updateListaJugadoresPartido(@PathVariable int id, @RequestBody ListaJugadoresPartidoDTO listaJugadoresPartidoDTO) {
        try {
            ListaJugadoresPartidoDTO listaJugadoresPartidoDTOExistente = listaJugadoresPartidoService.getListaJugadoresPartidoById(id);
            if (listaJugadoresPartidoDTOExistente != null) {
                ListaJugadoresPartidoDTO listaJugadoresPartidoActualizada = listaJugadoresPartidoService.updateListaJugadoresPartido(id, listaJugadoresPartidoDTO);
                return new ResponseEntity<>(listaJugadoresPartidoActualizada, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarListaJugadoresPartido(@PathVariable int id) {
        try {
            ListaJugadoresPartidoDTO listaJugadoresPartidoDTOExistente = listaJugadoresPartidoService.getListaJugadoresPartidoById(id);
            if (listaJugadoresPartidoDTOExistente != null) {
                listaJugadoresPartidoService.deleteListaJugadoresPartido(id);
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