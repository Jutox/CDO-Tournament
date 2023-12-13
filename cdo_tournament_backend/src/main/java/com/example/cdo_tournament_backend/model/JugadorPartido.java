package com.example.cdo_tournament_backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
    private int idJugadorPartido;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "jugador_id", nullable = false)
    @JsonManagedReference
    private Jugador jugador;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "listaJugadoresPartido_id", nullable = true)
    @JsonManagedReference
    private ListaJugadoresPartido listaJugadoresPartido;

    @OneToMany(mappedBy = "jugadorPartido", fetch = FetchType.EAGER)
    @JsonBackReference
    private List<Evento> eventos;

    @Column(nullable = true)
    private int numeroCamiseta;
    @Column(nullable = true)
    private boolean capitan;

    // Constructor
    public JugadorPartido() {}

    // Constructor con parametros
    public JugadorPartido(int idJugadorPartido, int numeroCamiseta, boolean capitan) {
        this.idJugadorPartido = idJugadorPartido;
        this.numeroCamiseta = numeroCamiseta;
        this.capitan = capitan;
    }

    // Getters and Setters
    public int getIdJugadorPartido() {
        return idJugadorPartido;
    }

    public void setIdJugadorPartido(int idJugadorPartido) {
        this.idJugadorPartido = idJugadorPartido;
    }

    public Jugador getJugador() {
        return jugador;
    }

    public void setJugador(Jugador jugador) {
        this.jugador = jugador;
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

    public ListaJugadoresPartido getListaJugadoresPartido() {
        return listaJugadoresPartido;
    }

    public void setListaJugadoresPartido(ListaJugadoresPartido listaJugadoresPartido) {
        this.listaJugadoresPartido = listaJugadoresPartido;
    }

    public List<Evento> getEventos() {
        return eventos;
    }

    public void setEventos(List<Evento> eventos) {
        this.eventos = eventos;
    }
    
}
