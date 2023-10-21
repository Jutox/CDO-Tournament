package com.example.cdo_tournament_backend.model;


import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Set {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_Set;

    @OneToMany(mappedBy = "eventos")
    private List<Evento> eventos;

    @ManyToOne
    @JoinColumn(name = "partido_id")
    private Partido partido_id;

    // Otros atributos de la clase Set

    private int numeroSet;
    private Date horaInicio;
    private Date horaTermino;
    private int puntajeA;
    private int puntajeB;

    // Constructor
    public Set() {
    }

    // Constructor completo
    public Set(int id_Set, int numeroSet, Date horaInicio, Date horaTermino, int puntajeA, int puntajeB) {
        this.id_Set = id_Set;
        this.numeroSet = numeroSet;
        this.horaInicio = horaInicio;
        this.horaTermino = horaTermino;
        this.puntajeA = puntajeA;
        this.puntajeB = puntajeB;
    }

    // Getters y setters
    public int getId_Set() {
        return id_Set;
    }

    public void setId_Set(int id_Set) {
        this.id_Set = id_Set;
    }

    public List<Evento> getEventos() {
        return eventos;
    }

    public void setEventos(List<Evento> eventos) {
        this.eventos = eventos;
    }

    public Partido getPartido_id() {
        return partido_id;
    }

    public void setPartido_id(Partido partido_id) {
        this.partido_id = partido_id;
    }

    public int getNumeroSet() {
        return numeroSet;
    }

    public void setNumeroSet(int numeroSet) {
        this.numeroSet = numeroSet;
    }

    public Date getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(Date horaInicio) {
        this.horaInicio = horaInicio;
    }

    public Date getHoraTermino() {
        return horaTermino;
    }

    public void setHoraTermino(Date horaTermino) {
        this.horaTermino = horaTermino;
    }

    public int getPuntajeA() {
        return puntajeA;
    }

    public void setPuntajeA(int puntajeA) {
        this.puntajeA = puntajeA;
    }

    public int getPuntajeB() {
        return puntajeB;
    }

    public void setPuntajeB(int puntajeB) {
        this.puntajeB = puntajeB;
    }
}

