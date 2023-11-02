package com.example.cdo_tournament_backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Equipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idEquipo;

    @Column(length = 45, nullable = false)
    private String nombreEquipo;
    @Column(length = 45, nullable = false)
    private String nombreEntrenador;

    @OneToMany(mappedBy = "equipo", fetch = FetchType.EAGER) // Corregido el mappedBy
    @JsonBackReference
    private List<ListaJugadoresPartido> listaJugadoresPartidos;

    // Constructor
    public Equipo() {}

    // Constructor con parámetros
    public Equipo(int idEquipo, String nombreEquipo, String nombreEntrenador) {
        super();
        this.idEquipo = idEquipo;
        this.nombreEquipo = nombreEquipo;
        this.nombreEntrenador = nombreEntrenador;
    }

    // Getters y Setters
    public int getIdEquipo() {
        return idEquipo;
    }

    public void setIdEquipo(int idEquipo) {
        this.idEquipo = idEquipo;
    }

    public String getNombreEquipo() {
        return nombreEquipo;
    }

    public void setNombreEquipo(String nombreEquipo) {
        this.nombreEquipo = nombreEquipo;
    }

    public String getNombreEntrenador() {
        return nombreEntrenador;
    }

    public void setNombreEntrenador(String nombreEntrenador) {
        this.nombreEntrenador = nombreEntrenador;
    }

    public List<ListaJugadoresPartido> getListaJugadoresPartidos() {
        return listaJugadoresPartidos;
    }

    public void setListaJugadoresPartidos(List<ListaJugadoresPartido> listaJugadoresPartidos) {
        this.listaJugadoresPartidos = listaJugadoresPartidos;
    }
}
