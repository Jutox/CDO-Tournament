package com.example.cdo_tournament_backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.cdo_tournament_backend.dto.AuthRequest;
import com.example.cdo_tournament_backend.dto.AuthResponse;
import com.example.cdo_tournament_backend.dto.RegisterRequest;
import com.example.cdo_tournament_backend.model.User;
import com.example.cdo_tournament_backend.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestMapping;

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


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/auth")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthRequest authRequest) {
        try {
            AuthResponse jwtDTO = authService.login(authRequest);
            return new ResponseEntity<>(jwtDTO, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); 
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid RegisterRequest registerRequest) {
        try {
            AuthResponse jwtDTO = authService.register(registerRequest);
            return new ResponseEntity<>(jwtDTO, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        try{
            List<User> users = authService.getAllUsers();
            return new ResponseEntity<>(users, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        try{
            User user = authService.getUserById(userId);
            if(user!=null){
                return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<AuthResponse> updateUser(@PathVariable Long userId, @RequestBody @Valid RegisterRequest updatedUser) {
        try {
            User existente = authService.getUserById(userId);
            if(existente!=null){
                AuthResponse jwtDTO = authService.updateUser(userId, updatedUser);
                return new ResponseEntity<>(jwtDTO, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones generales
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        try {
            User existente = authService.getUserById(userId);
            if(existente!=null){
                authService.deleteUser(userId);
                return ResponseEntity.noContent().build();
            }else {
                return ResponseEntity.notFound().build(); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones generales
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 - Internal Server Error
        }
    }
}