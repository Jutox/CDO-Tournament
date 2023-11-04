package com.example.cdo_tournament_backend.dto;

import java.util.Date;
import java.util.List;

public class SetPartidoDTO {
    private int idSetPartido;
    private List<EventoDTO> eventos;
    private PartidoDTO partido;
    private int numeroSet;
    private Date horaInicio;
    private Date horaTermino; 
    private int puntajeA;
    private int puntajeB;

    // Constructores, getters y setters, si es necesario

    public int getIdSetPartido() {
        return idSetPartido;
    }

    public void setIdSetPartido(int idSetPartido) {
        this.idSetPartido = idSetPartido;
    }

    public List<EventoDTO> getEventos() {
        return eventos;
    }

    public void setEventos(List<EventoDTO> eventos) {
        this.eventos = eventos;
    }

    public PartidoDTO getPartido() {
        return partido;
    }

    public void setPartido(PartidoDTO partido) {
        this.partido = partido;
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
