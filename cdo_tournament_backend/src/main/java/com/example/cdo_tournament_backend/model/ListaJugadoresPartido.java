package com.example.cdo_tournament_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.List;

@Entity
public class ListaJugadoresPartido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_JugadorPartido;

    @ManyToOne
    @JoinColumn(name = "equipo_id")
    private Equipo equipo;

    @ManyToOne
    @JoinColumn(name = "partido_id")
    private Partido partido;

    @OneToMany(mappedBy = "listaJugadoresPartido") // Esta es la corrección
    private List<JugadorPartido> jugadoresPartidos;

    private int numeroCamiseta;
    private boolean capitan;

    // Constructor
    public ListaJugadoresPartido() {
    }

     // Constructor completo
     public ListaJugadoresPartido(int id_JugadorPartido, int numeroCamiseta, boolean capitan) {
        this.id_JugadorPartido = id_JugadorPartido;
        this.numeroCamiseta = numeroCamiseta;
        this.capitan = capitan;
    }

    // Getters y Setters
    public int getIdJugadorPartido() {
        return id_JugadorPartido;
    }

    public void setIdJugadorPartido(int id_JugadorPartido) {
        this.id_JugadorPartido = id_JugadorPartido;
    }

    public Equipo getEquipo() {
        return equipo;
    }

    public void setEquipo(Equipo equipo) {
        this.equipo = equipo;
    }

    public Partido getPartido() {
        return partido;
    }

    public void setPartido(Partido partido) {
        this.partido = partido;
    }

    public List<JugadorPartido> getJugadoresPartidos() {
        return jugadoresPartidos;
    }

    public void setJugadoresPartidos(List<JugadorPartido> jugadoresPartidos) {
        this.jugadoresPartidos = jugadoresPartidos;
    }

    public int getNumeroCamiseta() {
        return numeroCamiseta;
    }

    public void setNumeroCamiseta(int numeroCamiseta) {
        this.numeroCamiseta = numeroCamiseta;
    }

    public boolean isCapitan() {
        return capitan;
    }

    public void setCapitan(boolean capitan) {
        this.capitan = capitan;
    }
}
