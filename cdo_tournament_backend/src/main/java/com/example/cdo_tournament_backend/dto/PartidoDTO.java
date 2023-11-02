package com.example.cdo_tournament_backend.dto;

import java.util.Date;
import java.util.List;

public class PartidoDTO {
    private int idPartido;
    private List<ListaJugadoresPartidoDTO> listaJugadoresPartidos;
    private List<SetPartidoDTO> sets;
    private TorneoDTO torneo;
    private String nombreCompeticion;
    private String ciudad;
    private String codigoPais;
    private String recinto;
    private String fase;
    private int numeroPartido;
    private String division;
    private String categoria;
    private Date fecha;
    private Date hora;

    // Constructores, getters y setters, si es necesario

    public int getIdPartido() {
        return idPartido;
    }

    public void setIdPartido(int idPartido) {
        this.idPartido = idPartido;
    }

    public List<ListaJugadoresPartidoDTO> getListaJugadoresPartidos() {
        return listaJugadoresPartidos;
    }

    public void setListaJugadoresPartidos(List<ListaJugadoresPartidoDTO> listaJugadoresPartidos) {
        this.listaJugadoresPartidos = listaJugadoresPartidos;
    }

    public List<SetPartidoDTO> getSets() {
        return sets;
    }

    public void setSets(List<SetPartidoDTO> sets) {
        this.sets = sets;
    }

    public TorneoDTO getTorneo() {
        return torneo;
    }

    public void setTorneo(TorneoDTO torneo) {
        this.torneo = torneo;
    }

    public String getNombreCompeticion() {
        return nombreCompeticion;
    }

    public void setNombreCompeticion(String nombreCompeticion) {
        this.nombreCompeticion = nombreCompeticion;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getCodigoPais() {
        return codigoPais;
    }

    public void setCodigoPais(String codigoPais) {
        this.codigoPais = codigoPais;
    }

    public String getRecinto() {
        return recinto;
    }

    public void setRecinto(String recinto) {
        this.recinto = recinto;
    }

    public String getFase() {
        return fase;
    }

    public void setFase(String fase) {
        this.fase = fase;
    }

    public int getNumeroPartido() {
        return numeroPartido;
    }

    public void setNumeroPartido(int numeroPartido) {
        this.numeroPartido = numeroPartido;
    }

    public String getDivision() {
        return division;
    }

    public void setDivision(String division) {
        this.division = division;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Date getHora() {
        return hora;
    }

    public void setHora(Date hora) {
        this.hora = hora;
    }
}
