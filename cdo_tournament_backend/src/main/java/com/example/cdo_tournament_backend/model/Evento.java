package com.example.cdo_tournament_backend.model;


import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_Evento;

    private Date hora;
    private String tipo;
    private int puntos;
    private int ordenServicio;
    private int rondaServicio;

    @ManyToOne
    @JoinColumn(name = "jugador_partido_id") // Esta es la corrección
    private JugadorPartido jugadorPartido;

    @ManyToOne
    @JoinColumn(name = "set_Id")
    private SetPartido set;

    // Constructor, getters y setters
    public Evento() {}

    public Evento(int id_Evento, Date hora, String tipo, int puntos, int ordenServicio, int rondaServicio) {
        super();
        this.id_Evento = id_Evento;
        this.hora = hora;
        this.tipo = tipo;
        this.puntos = puntos;
        this.ordenServicio = ordenServicio;
        this.rondaServicio = rondaServicio;
    }

    public int getIdEvento() {
        return id_Evento;
    }

    public void setIdEvento(int idEvento) {
        this.id_Evento = idEvento;
    }

    public Date getHora() {
        return hora;
    }

    public void setHora(Date hora) {
        this.hora = hora;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
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
}

