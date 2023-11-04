package com.example.cdo_tournament_backend.dto;

import java.util.List;

public class ListaJugadoresPartidoDTO {
    private int idListaJugadoresPartido; 
    private EquipoDTO equipo;
    private PartidoDTO partido;
    private List<JugadorPartidoDTO> jugadoresPartidos;

    // Constructores, getters y setters, si es necesario

    public int getIdListaJugadoresPartido() {
        return idListaJugadoresPartido;
    }

    public void setIdListaJugadoresPartido(int idListaJugadoresPartido) {
        this.idListaJugadoresPartido = idListaJugadoresPartido;
    }

    public EquipoDTO getEquipo() {
        return equipo;
    }

    public void setEquipo(EquipoDTO equipo) {
        this.equipo = equipo;
    }

    public PartidoDTO getPartido() {
        return partido;
    }

    public void setPartido(PartidoDTO partido) {
        this.partido = partido;
    }

    public List<JugadorPartidoDTO> getJugadoresPartidos() {
        return jugadoresPartidos;
    }

    public void setJugadoresPartidos(List<JugadorPartidoDTO> jugadoresPartidos) {
        this.jugadoresPartidos = jugadoresPartidos;
    }
}