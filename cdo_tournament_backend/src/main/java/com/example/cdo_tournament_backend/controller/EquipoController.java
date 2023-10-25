package com.example.cdo_tournament_backend.controller;

import com.example.cdo_tournament_backend.model.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/equipo")
public class EquipoController {

    @Autowired()
    private AdministradorImpl adminService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/user={user}/{password}/{rutComercio}")
    public ResponseEntity<String> getAdmin(@PathVariable String user,@PathVariable String password, @PathVariable String rutComercio) {
        Optional<Administrador> admin = adminService.getAmin(user, password,rutComercio);
        if(!admin.isEmpty()) return new ResponseEntity<>("admin", HttpStatus.ACCEPTED);
        return new ResponseEntity<>(HttpStatus.LOCKED);
    }

}