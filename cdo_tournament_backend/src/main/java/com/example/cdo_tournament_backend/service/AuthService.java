package com.example.cdo_tournament_backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.cdo_tournament_backend.dto.AuthRequest;
import com.example.cdo_tournament_backend.dto.AuthResponse;
import com.example.cdo_tournament_backend.dto.RegisterRequest;
import com.example.cdo_tournament_backend.model.Role;
import com.example.cdo_tournament_backend.model.User;
import com.example.cdo_tournament_backend.repository.UserRepository;

import jakarta.validation.Valid;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public AuthResponse login(@Valid AuthRequest auth) {

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(auth.getUsername(), auth.getPassword());
        authenticationManager.authenticate(authToken);

        User user = userRepository.findByUsername(auth.getUsername()).get();
        
        String jwt = jwtService.generateToken(user, generateExtraClaims(user));

        return new AuthResponse(jwt);
    }

    public AuthResponse register(@Valid RegisterRequest registerRequest) {

        User newUser = new User();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        newUser.setName(registerRequest.getName());
        newUser.setRole(Role.valueOf(registerRequest.getRole()));

        User savedUser = userRepository.save(newUser);

        String jwt = jwtService.generateToken(savedUser, generateExtraClaims(savedUser));

        return new AuthResponse(jwt);
    }

    private Map<String, Object> generateExtraClaims(User user) {

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("name", user.getName());
        extraClaims.put("role", user.getRole());
        extraClaims.put("username", user.getUsername());
        extraClaims.put("permission", user.getAuthorities());
        return extraClaims;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public AuthResponse updateUser(Long userId, @Valid RegisterRequest updatedUser) {
        User existente = userRepository.findById(userId).orElse(null);

        if(existente!=null){
            existente.setUsername(updatedUser.getUsername());
            existente.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            existente.setName(updatedUser.getName());
            existente.setRole(Role.valueOf(updatedUser.getRole()));
            userRepository.save(existente);
            return new AuthResponse(jwtService.generateToken(existente, generateExtraClaims(existente)));
        }else{
            return null;
        }        
    }

    public User getUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}