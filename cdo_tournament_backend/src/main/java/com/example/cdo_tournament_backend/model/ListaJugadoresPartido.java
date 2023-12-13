package com.example.cdo_tournament_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class ListaJugadoresPartido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idListaJugadoresPartido;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "equipo_id", nullable = false)
    @JsonManagedReference
    private Equipo equipo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "partido_id", nullable = true)
    @JsonManagedReference
    private Partido partido;

    @OneToMany(mappedBy = "listaJugadoresPartido", fetch = FetchType.EAGER) // Esta es la corrección
    @JsonBackReference
    private List<JugadorPartido> jugadoresPartidos;


    // Constructor
    public ListaJugadoresPartido() {
    }

     // Constructor completo
     public ListaJugadoresPartido(int idListaJugadoresPartido, int numeroCamiseta, boolean capitan) {
        this.idListaJugadoresPartido = idListaJugadoresPartido;
    }

    // Getters y Setters
    public int getIdListaJugadoresPartido() {
        return idListaJugadoresPartido;
    }

    public void setIdListaJugadoresPartido(int idListaJugadoresPartido) {
        this.idListaJugadoresPartido = idListaJugadoresPartido;
    }

    public Equipo getEquipo() {
        return equipo;
    }

    public void setEquipo(Equipo equipo) {
        this.equipo = equipo;
    }

    public Partido getPartido() {
        return partido;
    }

    public void setPartido(Partido partido) {
        this.partido = partido;
    }

    public List<JugadorPartido> getJugadoresPartidos() {
        return jugadoresPartidos;
    }

    public void setJugadoresPartidos(List<JugadorPartido> jugadoresPartidos) {
        this.jugadoresPartidos = jugadoresPartidos;
    }
}
