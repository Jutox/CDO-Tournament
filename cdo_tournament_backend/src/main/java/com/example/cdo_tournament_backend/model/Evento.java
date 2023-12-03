package com.example.cdo_tournament_backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idEvento;

    @Column(nullable = false)
    @Temporal(TemporalType.TIME)
    private String hora;
    @Column(name = "tipo_evento", nullable = false)
    @Enumerated(EnumType.STRING) // Especifica cómo se debe mapear el enumerado
    private TipoEvento tipo;
    @Column(nullable = false)
    private int puntos;
    @Column(nullable = false)
    private int ordenServicio;
    @Column(nullable = false)
    private int rondaServicio;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "jugador_partido_id", nullable = false) // Esta es la corrección
    @JsonManagedReference
    private JugadorPartido jugadorPartido;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "set_id", nullable = false)
    @JsonManagedReference
    private SetPartido set;

    // Constructor, getters y setters
    public Evento() {}

    public Evento(int idEvento, String hora, TipoEvento tipo, int puntos, int ordenServicio, int rondaServicio) {
        super();
        this.idEvento = idEvento;
        this.hora = hora;
        this.tipo = tipo;
        this.puntos = puntos;
        this.ordenServicio = ordenServicio;
        this.rondaServicio = rondaServicio;
    }

    public int getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(int idEvento) {
        this.idEvento = idEvento;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public TipoEvento getTipo() {
        return tipo;
    }

    public void setTipo(TipoEvento tipo) {
        this.tipo = tipo;
    }

    public int getPuntos() {
        return puntos;
    }

    public void setPuntos(int puntos) {
        this.puntos = puntos;
    }

    public int getOrdenServicio() {
        return ordenServicio;
    }

    public void setOrdenServicio(int ordenServicio) {
        this.ordenServicio = ordenServicio;
    }

    public int getRondaServicio() {
        return rondaServicio;
    }

    public void setRondaServicio(int rondaServicio) {
        this.rondaServicio = rondaServicio;
    }

    public JugadorPartido getJugadorPartido() {
        return jugadorPartido;
    }

    public void setJugadorPartido(JugadorPartido jugadorPartido) {
        this.jugadorPartido = jugadorPartido;
    }

    public SetPartido getSetPartido(){
        return set;
    }

    public void setSetPartido(SetPartido set){
        this.set = set;
    }
}

