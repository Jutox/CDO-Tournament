package com.example.cdo_tournament_backend.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Equipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_Equipo;

    private String nombreEquipo;
    private String nombreEntrenador;

    @OneToMany(mappedBy = "equipo")
    private List<ListaJugadoresPartido> listaJugadoresPartidos;

    // Constructor
    public Equipo() {}

    // Constructor con parámetros
    public Equipo( int id_Equipo, String nombreEquipo, String nombreEntrenador) {
        super();
        this.id_Equipo = id_Equipo;
        this.nombreEquipo = nombreEquipo;
        this.nombreEntrenador = nombreEntrenador;
    }

    // Getters y Setters
    public int getIdEquipo() {
        return id_Equipo;
    }

    public void setIdEquipo(int idEquipo) {
        this.id_Equipo = idEquipo;
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
