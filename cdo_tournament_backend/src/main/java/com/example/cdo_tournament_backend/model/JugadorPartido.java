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
public class JugadorPartido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_JugadorPartido;

    @ManyToOne
    @JoinColumn(name = "jugador_id")
    private Jugador jugador;

    @ManyToOne
    @JoinColumn(name = "lista_jugadores_partido_id")
    private ListaJugadoresPartido listaJugadoresPartidos;

    @OneToMany(mappedBy = "evento")
    private List<Evento> eventos;

    private int numeroCamiseta;
    private boolean capitan;

    // Constructor
    public JugadorPartido(int id_JugadorPartido, int numeroCamiseta, boolean capitan) {
        this.id_JugadorPartido = id_JugadorPartido;
        this.numeroCamiseta = numeroCamiseta;
        this.capitan = capitan;
    }

    // Getters and Setters
    public int getId_JugadorPartido() {
        return id_JugadorPartido;
    }

    public void setId_JugadorPartido(int id_JugadorPartido) {
        this.id_JugadorPartido = id_JugadorPartido;
    }

    public Jugador getJugador() {
        return jugador;
    }

    public void setJugador(Jugador jugador) {
        this.jugador = jugador;
    }

    public ListaJugadoresPartido getListaJugadoresPartido() {
        return listaJugadoresPartidos;
    }

    public void setListaJugadoresPartido(ListaJugadoresPartido listaJugadoresPartido) {
        this.listaJugadoresPartidos = listaJugadoresPartido;
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

