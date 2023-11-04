package com.example.cdo_tournament_backend.dto;

import java.util.List;

public class JugadorPartidoDTO {
    private int idJugadorPartido;
    private JugadorDTO jugador;
    private ListaJugadoresPartidoDTO listaJugadoresPartido;
    private List<EventoDTO> eventos;
    private int numeroCamiseta;
    private boolean capitan;

    // Constructores, getters y setters, si es necesario

    public int getIdJugadorPartido() {
        return idJugadorPartido; 
    }

    public void setIdJugadorPartido(int idJugadorPartido) {
        this.idJugadorPartido = idJugadorPartido;
    }

    public JugadorDTO getJugador() {
        return jugador;
    }

    public void setJugador(JugadorDTO jugador) {
        this.jugador = jugador;
    }

    public ListaJugadoresPartidoDTO getListaJugadoresPartido() {
        return listaJugadoresPartido;
    }

    public void setListaJugadoresPartido(ListaJugadoresPartidoDTO listaJugadoresPartido) {
        this.listaJugadoresPartido = listaJugadoresPartido;
    }

    public List<EventoDTO> getEventos() {
        return eventos;
    }

    public void setEventos(List<EventoDTO> eventos) {
        this.eventos = eventos;
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
}
