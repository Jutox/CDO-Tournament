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
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class SetPartido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idSetPartido;

    @OneToMany(mappedBy = "set", fetch = FetchType.EAGER)
    @JsonBackReference
    private List<Evento> eventos;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "partido_id", nullable = false) // Asegúrate de que coincida con la columna real en la tabla 
    @JsonManagedReference
    private Partido partido;

    // Otros atributos de la clase Set

    @Column(nullable = false)
    private int numeroSet;
    @Column(nullable = false)
    @Temporal(TemporalType.TIME)
    private String horaInicio;
    @Column(nullable = false)
    @Temporal(TemporalType.TIME)
    private String horaTermino;
    @Column(nullable = false)
    private int puntajeA;
    @Column(nullable = false)
    private int puntajeB;

    // Constructor
    public SetPartido() {
    }

    // Constructor completo
    public SetPartido(int idSetPartido, int numeroSet, String horaInicio, String horaTermino, int puntajeA, int puntajeB) {
        this.idSetPartido = idSetPartido;
        this.numeroSet = numeroSet;
        this.horaInicio = horaInicio;
        this.horaTermino = horaTermino;
        this.puntajeA = puntajeA;
        this.puntajeB = puntajeB;
    }

    // Getters y setters
    public int getIdSetPartido() {
        return idSetPartido;
    }

    public void setIdSetPartido(int idSetPartido) {
        this.idSetPartido = idSetPartido;
    }

    public List<Evento> getEventos() {
        return eventos;
    }

    public void setEventos(List<Evento> eventos) {
        this.eventos = eventos;
    }

    public Partido getPartido() {
        return partido;
    }

    public void setPartido(Partido partido) {
        this.partido = partido;
    }

    public int getNumeroSet() {
        return numeroSet;
    }

    public void setNumeroSet(int numeroSet) {
        this.numeroSet = numeroSet;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getHoraTermino() {
        return horaTermino;
    }

    public void setHoraTermino(String horaTermino) {
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

