package com.example.cdo_tournament_backend.controller;

import com.example.cdo_tournament_backend.model.Equipo;
import com.example.cdo_tournament_backend.service.EquipoImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


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
            Equipo retorno = equipoService.createEquipo(equipo);
            return  new ResponseEntity<>(retorno, HttpStatus.ACCEPTED);
        }catch (Exception ev){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    } 

    @GetMapping("/{id}")
    public ResponseEntity<Equipo> getEquipoById(@PathVariable int id) {
        try {
            Equipo equipo = equipoService.getEquipoById(id);
    
            if (equipo != null) {
                return new ResponseEntity<>(equipo, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 - Internal Server Error
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Equipo> updateEquipo(@PathVariable int id, @RequestBody Equipo equipoActual) {
        try{
            Equipo equipoBD = equipoService.getEquipoById(id);
            if (equipoBD != null) {
                Equipo equipo = equipoService.updateEquipo(id, equipoActual);
                return new ResponseEntity<>(equipo, HttpStatus.ACCEPTED);
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
            Equipo equipoBD = equipoService.getEquipoById(id);
            if (equipoBD != null) {
                equipoService.deleteEquipo(id);
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