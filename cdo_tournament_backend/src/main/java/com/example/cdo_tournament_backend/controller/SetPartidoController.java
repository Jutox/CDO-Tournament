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

import com.example.cdo_tournament_backend.dto.SetPartidoDTO;
import com.example.cdo_tournament_backend.service.SetPartidoImpl;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/setPartido")
public class SetPartidoController {

    @Autowired
    private SetPartidoImpl setPartidoService;

    @GetMapping("/sets")
    public ResponseEntity<List<SetPartidoDTO>> getSetsPartido() {
        try {
            List<SetPartidoDTO> list = setPartidoService.getAllSetsPartido();
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<SetPartidoDTO> createSetPartido(@RequestBody SetPartidoDTO setPartidoDTO) {
        try {
            SetPartidoDTO retorno = setPartidoService.createSetPartido(setPartidoDTO);
            return new ResponseEntity<>(retorno, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<SetPartidoDTO> getSetPartidoById(@PathVariable int id) {
        try {
            SetPartidoDTO setPartidoDTO = setPartidoService.getSetPartidoById(id);

            if (setPartidoDTO != null) {
                return new ResponseEntity<>(setPartidoDTO, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<SetPartidoDTO> updateSetPartido(@PathVariable int id, @RequestBody SetPartidoDTO setPartidoDTO) {
        try {
            SetPartidoDTO setPartidoDTOExistente = setPartidoService.getSetPartidoById(id);
            if (setPartidoDTOExistente != null) {
                SetPartidoDTO setPartidoActualizado = setPartidoService.updateSetPartido(id, setPartidoDTO);
                return new ResponseEntity<>(setPartidoActualizado, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSetPartido(@PathVariable int id) {
        try {
            SetPartidoDTO setPartidoDTOExistente = setPartidoService.getSetPartidoById(id);
            if (setPartidoDTOExistente != null) {
                setPartidoService.deleteSetPartido(id);
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