package com.example.cdo_tournament_backend.dto;

import java.util.List;

public class EquipoDTO {
    private int idEquipo;
    private String nombreEquipo;
    private String nombreEntrenador;
    private List<ListaJugadoresPartidoDTO> listaJugadoresPartidos;

    // Constructores, getters y setters, si es necesario

    public int getIdEquipo() {
        return idEquipo;
    }

    public void setIdEquipo(int idEquipo) {
        this.idEquipo = idEquipo;
    }

    public String getNombreEquipo() {
        return nombreEquipo;
    }

    public void setNombreEquipo(String nombreEquipo) {
        this.nombreEquipo = nombreEquipo;
    }

    public String getNombreEntrenador() {
        return nombreEntrenador;
    }

    public void setNombreEntrenador(String nombreEntrenador) {
        this.nombreEntrenador = nombreEntrenador;
    }

    public List<ListaJugadoresPartidoDTO> getListaJugadoresPartidos() {
        return listaJugadoresPartidos;
    }

    public void setListaJugadoresPartidos(List<ListaJugadoresPartidoDTO> listaJugadoresPartidos) {
        this.listaJugadoresPartidos = listaJugadoresPartidos;
    }
}