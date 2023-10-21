package com.example.cdo_tournament_backend.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Torneo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_Torneo;

    @OneToMany(mappedBy = "torneo")
    private List<Partido> partidos;

    // Otros atributos de la clase Torneo
    private String nombre;
    private Date fechaInicio;
    private Date fechaTermino;
    private String lugar;

    // Constructor
    public Torneo() {
    }

    // Constructor completo
    public Torneo(int id_Torneo, String nombre, Date fechaInicio, Date fechaTermino, String lugar) {
        this.id_Torneo = id_Torneo;
        this.nombre = nombre;
        this.fechaInicio = fechaInicio;
        this.fechaTermino = fechaTermino;
        this.lugar = lugar;
    }

    // Getters y setters
    public int getId_Torneo() {
        return id_Torneo;
    }

    public void setId_Torneo(int id_Torneo) {
        this.id_Torneo = id_Torneo;
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
