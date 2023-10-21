package com.example.cdo_tournament_backend.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class ListaJugadoresPartido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_JugadorPartido;

    @ManyToOne
    @JoinColumn(name = "equipo_id")
    private Equipo equipoId;

    @ManyToOne
    @JoinColumn(name = "partido_id")
    private Partido partidoId;

    @OneToMany(mappedBy = "jugadoresPartido")
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

    public Equipo getEquipoId() {
        return equipoId;
    }

    public void setEquipoId(Equipo equipoId) {
        this.equipoId = equipoId;
    }

    public Partido getPartidoId() {
        return partidoId;
    }

    public void setPartidoId(Partido partidoId) {
        this.partidoId = partidoId;
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