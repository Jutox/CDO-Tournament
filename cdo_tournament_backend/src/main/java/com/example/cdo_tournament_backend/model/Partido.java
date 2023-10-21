package com.example.cdo_tournament_backend.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Partido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_Partido;

    @OneToMany(mappedBy = "listaJugadoresPartidos")
    private List<ListaJugadoresPartido> listaJugadoresPartidos;

    @OneToMany(mappedBy = "sets")
    private List<Set> sets;

    @ManyToOne
    @JoinColumn(name = "torneo_id")
    private Torneo torneo;

    // Otros atributos de la clase Partido
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

    // Constructor
    public Partido() {
    }

    // Constructor completo
    public Partido(int id_Partido, String nombreCompeticion, String ciudad, String codigoPais, String recinto, String fase, int numeroPartido, String division, String categoria, Date fecha, Date hora) {
        this.id_Partido = id_Partido;
        this.nombreCompeticion = nombreCompeticion;
        this.ciudad = ciudad;
        this.codigoPais = codigoPais;
        this.recinto = recinto;
        this.fase = fase;
        this.numeroPartido = numeroPartido;
        this.division = division;
        this.categoria = categoria;
        this.fecha = fecha;
        this.hora = hora;
    }

    // Getters y Setters
    public int getIdPartido() {
        return id_Partido;
    }

    public void setIdPartido(int idPartido) {
        this.id_Partido = idPartido;
    }

    public List<ListaJugadoresPartido> getListaJugadoresPartidos() {
        return listaJugadoresPartidos;
    }

    public void setListaJugadoresPartidos(List<ListaJugadoresPartido> listaJugadoresPartidos) {
        this.listaJugadoresPartidos = listaJugadoresPartidos;
    }

    public List<Set> getSets() {
        return sets;
    }

    public void setSets(List<Set> sets) {
        this.sets = sets;
    }

    public Torneo getTorneo() {
        return torneo;
    }

    public void setTorneo(Torneo torneo) {
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
