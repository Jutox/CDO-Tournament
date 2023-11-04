package com.example.cdo_tournament_backend.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Torneo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idTorneo;

    @OneToMany(mappedBy = "torneo", fetch = FetchType.EAGER)
    @JsonBackReference
    private List<Partido> partidos;

    // Otros atributos de la clase Torneo
    @Column(length = 45, nullable = false)
    private String nombre;
    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fechaInicio;
    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fechaTermino;
    @Column(length = 45, nullable = false)
    private String lugar;

    // Constructor
    public Torneo() {
    }

    // Constructor completo
    public Torneo(int idTorneo, String nombre, Date fechaInicio, Date fechaTermino, String lugar) {
        this.idTorneo = idTorneo;
        this.nombre = nombre;
        this.fechaInicio = fechaInicio;
        this.fechaTermino = fechaTermino;
        this.lugar = lugar;
    }

    // Getters y setters
    public int getIdTorneo() {
        return idTorneo;
    }

    public void setIdTorneo(int idTorneo) {
        this.idTorneo = idTorneo;
    }

    public List<Partido> getPartidos() {
        return partidos;
    }

    public void setPartidos(List<Partido> partidos) {
        this.partidos = partidos;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaTermino() {
        return fechaTermino;
    }

    public void setFechaTermino(Date fechaTermino) {
        this.fechaTermino = fechaTermino;
    }

    public String getLugar() {
        return lugar;
    }

    public void setLugar(String lugar) {
        this.lugar = lugar;
    }
}
