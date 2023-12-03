package com.example.cdo_tournament_backend.dto;

public class EventoDTO {
    private int idEvento;
    private String hora;
    private String tipo;
    private int puntos;
    private int ordenServicio;
    private int rondaServicio;
    private JugadorPartidoDTO jugadorPartido;
    private SetPartidoDTO set;

    // Constructores, getters y setters, si es necesario

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

    public JugadorPartidoDTO getJugadorPartido() {
        return jugadorPartido;
    }

    public void setJugadorPartido(JugadorPartidoDTO jugadorPartido) {
        this.jugadorPartido = jugadorPartido;
    }

    public SetPartidoDTO getSet() {
        return set;
    }

    public void setSet(SetPartidoDTO set) {
        this.set = set;
    }
}
