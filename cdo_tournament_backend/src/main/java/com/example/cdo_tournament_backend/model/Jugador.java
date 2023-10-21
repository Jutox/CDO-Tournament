package com.example.cdo_tournament_backend.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Jugador {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_Jugador;

    private String nombres;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String rut;
    private Date fechaNacimiento;
    private String sexo;
    private String telefono;
    private String email;
    private int estatura;
    private int peso;
    private int alcanceMano;
    private int alcanceBloqueo;

    @OneToMany(mappedBy = "jugador")
    private List<JugadorPartido> partidos;

    public Jugador(){}

    public Jugador(int id_Jugador, String nombres, String apellidoPaterno, String apellidoMaterno, String rut, Date fechaNacimiento, String sexo, String telefono, String email, int estatura, int peso, int alcanceMano, int alcanceBloqueo) {
        super();
        this.id_Jugador = id_Jugador;
        this.nombres = nombres;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.rut = rut;
        this.fechaNacimiento = fechaNacimiento;
        this.sexo = sexo;
        this.telefono = telefono;
        this.email = email;
        this.estatura = estatura;
        this.peso = peso;
        this.alcanceMano = alcanceMano;
        this.alcanceBloqueo = alcanceBloqueo;
    }

    public int getId_Jugador() {
        return id_Jugador;
    }

    public void setid_Jugador(int id_Jugador) {
        this.id_Jugador = id_Jugador;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidoPaterno;
    }

    public void setApellidos(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
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

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
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
}
