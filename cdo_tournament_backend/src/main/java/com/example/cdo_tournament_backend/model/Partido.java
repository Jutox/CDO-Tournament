package com.example.cdo_tournament_backend.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Partido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPartido;

    @OneToMany(mappedBy = "partido", fetch = FetchType.EAGER)
    @JsonBackReference
    private List<ListaJugadoresPartido> listaJugadoresPartidos;

    @OneToMany(mappedBy = "partido", fetch = FetchType.EAGER)
    @JsonBackReference
    private List<SetPartido> sets;

    @ManyToOne(fetch = FetchType.EAGER) 
    @JoinColumn(name = "torneo_id")
    @JsonManagedReference
    private Torneo torneo;

    // Otros atributos de la clase Partido
    @Column(length = 45, nullable = false)
    private String nombreCompeticion;
    @Column(length = 45, nullable = false)
    private String ciudad;
    @Column(length = 3, nullable = false)
    private String codigoPais;
    @Column(length = 45, nullable = false)
    private String recinto;
    @Column(length = 15, nullable = false)
    private String fase;
    @Column(nullable = false)
    private int numeroPartido;
    @Column(length = 9, nullable = false)
    private String division;
    @Column(length = 7, nullable = false)
    private String categoria;
    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fecha;    
    @Column(nullable = false)
    @Temporal(TemporalType.TIME)
    private Date hora;

    // Constructor
    public Partido() {
    }

    // Constructor completo
    public Partido(int idPartido, String nombreCompeticion, String ciudad, String codigoPais, String recinto, String fase, int numeroPartido, String division, String categoria, Date fecha, Date hora) {
        this.idPartido = idPartido;
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
        return idPartido;
    }

    public void setIdPartido(int idPartido) {
        this.idPartido = idPartido;
    }

    public List<ListaJugadoresPartido> getListaJugadoresPartidos() {
        return listaJugadoresPartidos;
    }

    public void setListaJugadoresPartidos(List<ListaJugadoresPartido> listaJugadoresPartidos) {
        this.listaJugadoresPartidos = listaJugadoresPartidos;
    }

    public List<SetPartido> getSets() {
        return sets;
    }

    public void setSets(List<SetPartido> sets) {
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
