package com.example.cdo_tournament_backend.dto;

import java.util.Date;
import java.util.List;

public class TorneoDTO {
    private int idTorneo; 
    private List<PartidoDTO> partidos;
    private String nombre;
    private Date fechaInicio;
    private Date fechaTermino;
    private String lugar;

    // Constructores, getters y setters, si es necesario

    public int getIdTorneo() {
        return idTorneo;
    }

    public void setIdTorneo(int idTorneo) {
        this.idTorneo = idTorneo;
    }

    public List<PartidoDTO> getPartidos() {
        return partidos;
    }

    public void setPartidos(List<PartidoDTO> partidos) {
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
