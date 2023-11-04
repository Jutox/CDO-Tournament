package com.example.cdo_tournament_backend.dto;

import java.util.Date;
import java.util.List;

public class JugadorDTO {
    private int idJugador;
    private String nombres;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String rut;
    private Date fechaNacimiento;
    private String genero;
    private String telefono;
    private String email;
    private int estatura;
    private int peso;
    private int alcanceMano;
    private int alcanceBloqueo;
    private List<JugadorPartidoDTO> partidos;
    // Constructores, getters y setters, si es necesario

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

    public int getEstatura() {
        return estatura;
    }

    public void setEstatura(int estatura) {
        this.estatura = estatura;
    }

    public int getPeso() {
        return peso;
    }

    public void setPeso(int peso) {
        this.peso = peso;
    }

    public int getAlcanceMano() {
        return alcanceMano;
    }

    public void setAlcanceMano(int alcanceMano) {
        this.alcanceMano = alcanceMano;
    }

    public int getAlcanceBloqueo() {
        return alcanceBloqueo;
    }

    public void setAlcanceBloqueo(int alcanceBloqueo) {
        this.alcanceBloqueo = alcanceBloqueo;
    }

    public List<JugadorPartidoDTO> getPartidos() {
        return partidos;
    }

    public void setPartidos(List<JugadorPartidoDTO> partidos) {
        this.partidos = partidos;
    }
}
