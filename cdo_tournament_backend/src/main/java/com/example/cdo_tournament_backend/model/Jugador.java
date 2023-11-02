package com.example.cdo_tournament_backend.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Jugador {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idJugador;

    @Column(length = 45, nullable = false)
    private String nombres;
    @Column(length = 45, nullable = false)
    private String apellidoPaterno;
    @Column(length = 45, nullable = false)
    private String apellidoMaterno;
    @Column(length = 9, nullable = true)
    private String rut;
    @Column(nullable = true)
    @Temporal(TemporalType.DATE)
    private Date fechaNacimiento;    
    @Column(length = 1, nullable = true)
    private String genero;   
    @Column(length = 9, nullable = true)
    private String telefono;    
    @Column(length = 45, nullable = true)
    private String email;
    @Column(nullable = true)
    private Integer estatura;
    @Column(nullable = true)
    private Integer peso;
    @Column(nullable = true)
    private Integer alcanceMano;
    @Column(nullable = true)
    private Integer alcanceBloqueo;

    @OneToMany(mappedBy = "jugador", fetch = FetchType.EAGER)
    @JsonBackReference
    private List<JugadorPartido> partidos;

    public Jugador(){}

    public Jugador(int idJugador, String nombres, String apellidoPaterno, String apellidoMaterno, String rut, Date fechaNacimiento, String genero, String telefono, String email, Integer estatura, Integer peso, Integer alcanceMano, Integer alcanceBloqueo) {
        super();
        this.idJugador = idJugador;
        this.nombres = nombres;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.rut = rut;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.telefono = telefono;
        this.email = email;
        this.estatura = estatura;
        this.peso = peso;
        this.alcanceMano = alcanceMano;
        this.alcanceBloqueo = alcanceBloqueo;
    }

    public int getIdJugador() {
        return idJugador;
    }

    public void setIdJugador(int idJugador) {
        this.idJugador = idJugador;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidoPaterno() {
        return apellidoPaterno;
    }

    public void setApellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

     public String getApellidoMaterno() {
        return apellidoMaterno;
    }

    public void setApellidoMaterno(String apellidoMaterno) {
        this.apellidoMaterno = apellidoMaterno;
    }

    public String getRut() {
        return rut;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getEstatura() {
        return estatura;
    }

    public void setEstatura(Integer estatura) {
        this.estatura = estatura;
    }

    public Integer getPeso() {
        return peso;
    }

    public void setPeso(Integer peso) {
        this.peso = peso;
    }

    public Integer getAlcanceMano() {
        return alcanceMano;
    }

    public void setAlcanceMano(Integer alcanceMano) {
        this.alcanceMano = alcanceMano;
    }

    public Integer getAlcanceBloqueo() {
        return alcanceBloqueo;
    }

    public void setAlcanceBloqueo(Integer alcanceBloqueo) {
        this.alcanceBloqueo = alcanceBloqueo;
    }

    public List<JugadorPartido> getPartidos() {
        return partidos;
    }

    public void setPartidos(List<JugadorPartido> partidos) {
        this.partidos = partidos;
    }
    
}
