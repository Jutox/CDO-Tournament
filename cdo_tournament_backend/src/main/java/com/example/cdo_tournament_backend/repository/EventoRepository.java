package com.example.cdo_tournament_backend.repository;

import com.example.cdo_tournament_backend.model.*;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface EventoRepository extends JpaRepository<Evento, Integer>{
    
    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "WHERE e.set_id = :setId ", nativeQuery = true)
    List<Evento> findEventosBySet(
        @Param("setId") int setId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "JOIN cdo.torneo t ON p.torneo_id = t.id_torneo " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND t.id_torneo = :torneoId " +
        "AND e.tipo_evento = 'ATAQUE_EXITOSO'", nativeQuery = true)
    List<Evento> findAtaquesExitososByJugadorAndTorneo(
        @Param("jugadorId") int jugadorId,
        @Param("torneoId") int torneoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND p.id_partido = :partidoId " +
        "AND e.tipo_evento = 'ATAQUE_EXITOSO'", nativeQuery = true)
    List<Evento> findAtaquesExitososByJugadorAndPartido(
        @Param("jugadorId") int jugadorId,
        @Param("partidoId") int partidoId
    );
    
    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND e.tipo_evento = 'ATAQUE_EXITOSO'", nativeQuery = true)
    List<Evento> findAtaquesExitososByJugador(
        @Param("jugadorId") int jugadorId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "JOIN cdo.torneo t ON p.torneo_id = t.id_torneo " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND t.id_torneo = :torneoId " +
        "AND e.tipo_evento = 'ATAQUE_FALLIDO'", nativeQuery = true)
    List<Evento> findAtaquesFallidosByJugadorAndTorneo(
        @Param("jugadorId") int jugadorId,
        @Param("torneoId") int torneoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND p.id_partido = :partidoId " +
        "AND e.tipo_evento = 'ATAQUE_FALLIDO'", nativeQuery = true)
    List<Evento> findAtaquesFallidosByJugadorAndPartido(
        @Param("jugadorId") int jugadorId,
        @Param("partidoId") int partidoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND e.tipo_evento = 'ATAQUE_FALLIDO'", nativeQuery = true)
    List<Evento> findAtaquesFallidosByJugador(
        @Param("jugadorId") int jugadorId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "JOIN cdo.torneo t ON p.torneo_id = t.id_torneo " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND t.id_torneo = :torneoId " +
        "AND e.tipo_evento = 'SAQUE_EXITOSO'", nativeQuery = true)
    List<Evento> findSaquesExitososByJugadorAndTorneo(
        @Param("jugadorId") int jugadorId,
        @Param("torneoId") int torneoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND p.id_partido = :partidoId " +
        "AND e.tipo_evento = 'SAQUE_EXITOSO'", nativeQuery = true)
    List<Evento> findSaquesExitososByJugadorAndPartido(
        @Param("jugadorId") int jugadorId,
        @Param("partidoId") int partidoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND e.tipo_evento = 'SAQUE_EXITOSO'", nativeQuery = true)
    List<Evento> findSaquesExitososByJugador(
        @Param("jugadorId") int jugadorId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "JOIN cdo.torneo t ON p.torneo_id = t.id_torneo " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND t.id_torneo = :torneoId " +
        "AND e.tipo_evento = 'SAQUE_FALLIDO'", nativeQuery = true)
    List<Evento> findSaquesFallidosByJugadorAndTorneo(
        @Param("jugadorId") int jugadorId,
        @Param("torneoId") int torneoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND p.id_partido = :partidoId " +
        "AND e.tipo_evento = 'SAQUE_FALLIDO'", nativeQuery = true)
    List<Evento> findSaquesFallidosByJugadorAndPartido(
        @Param("jugadorId") int jugadorId,
        @Param("partidoId") int partidoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND e.tipo_evento = 'SAQUE_FALLIDO'", nativeQuery = true)
    List<Evento> findSaquesFallidosByJugador(
        @Param("jugadorId") int jugadorId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "JOIN cdo.torneo t ON p.torneo_id = t.id_torneo " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND t.id_torneo = :torneoId " +
        "AND e.tipo_evento = 'BLOQUEO_EXITOSO'", nativeQuery = true)
    List<Evento> findBloqueosExitososByJugadorAndTorneo(
        @Param("jugadorId") int jugadorId,
        @Param("torneoId") int torneoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND p.id_partido = :partidoId " +
        "AND e.tipo_evento = 'BLOQUEO_EXITOSO'", nativeQuery = true)
    List<Evento> findBloqueosExitososByJugadorAndPartido(
        @Param("jugadorId") int jugadorId,
        @Param("partidoId") int partidoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND e.tipo_evento = 'BLOQUEO_EXITOSO'", nativeQuery = true)
    List<Evento> findBloqueosExitososByJugador(
        @Param("jugadorId") int jugadorId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "JOIN cdo.torneo t ON p.torneo_id = t.id_torneo " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND t.id_torneo = :torneoId " +
        "AND e.tipo_evento = 'ADVERTENCIA'", nativeQuery = true)
    List<Evento> findAdvertenciasByJugadorAndTorneo(
        @Param("jugadorId") int jugadorId,
        @Param("torneoId") int torneoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND p.id_partido = :partidoId " +
        "AND e.tipo_evento = 'ADVERTENCIA'", nativeQuery = true)
    List<Evento> findAdvertenciasByJugadorAndPartido(
        @Param("jugadorId") int jugadorId,
        @Param("partidoId") int partidoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND e.tipo_evento = 'ADVERTENCIA'", nativeQuery = true)
    List<Evento> findAdvertenciasByJugador(
        @Param("jugadorId") int jugadorId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "JOIN cdo.torneo t ON p.torneo_id = t.id_torneo " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND t.id_torneo = :torneoId " +
        "AND e.tipo_evento = 'DESCALIFICACION'", nativeQuery = true)
    List<Evento> findDescalificacionesByJugadorAndTorneo(
        @Param("jugadorId") int jugadorId,
        @Param("torneoId") int torneoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND p.id_partido = :partidoId " +
        "AND e.tipo_evento = 'DESCALIFICACION'", nativeQuery = true)
    List<Evento> findDescalificacionesByJugadorAndPartido(
        @Param("jugadorId") int jugadorId,
        @Param("partidoId") int partidoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND e.tipo_evento = 'DESCALIFICACION'", nativeQuery = true)
    List<Evento> findDescalificacionesByJugador(
        @Param("jugadorId") int jugadorId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "JOIN cdo.torneo t ON p.torneo_id = t.id_torneo " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND t.id_torneo = :torneoId " +
        "AND e.tipo_evento = 'PENALIZACION'", nativeQuery = true)
    List<Evento> findPenalizacionesByJugadorAndTorneo(
        @Param("jugadorId") int jugadorId,
        @Param("torneoId") int torneoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND p.id_partido = :partidoId " +
        "AND e.tipo_evento = 'PENALIZACION'", nativeQuery = true)
    List<Evento> findPenalizacionesByJugadorAndPartido(
        @Param("jugadorId") int jugadorId,
        @Param("partidoId") int partidoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.jugador j ON jp.jugador_id = j.id_jugador " +
        "WHERE j.id_jugador = :jugadorId " +
        "AND e.tipo_evento = 'PENALIZACION'", nativeQuery = true)
    List<Evento> findPenalizacionesByJugador(
        @Param("jugadorId") int jugadorId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "JOIN cdo.torneo t ON p.torneo_id = t.id_torneo " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND t.id_torneo = :torneoId " +
        "AND e.tipo_evento = 'ATAQUE_EXITOSO'", nativeQuery = true)
    List<Evento> findAtaquesExitososByEquipoAndTorneo(
        @Param("equipoId") int equipoId,
        @Param("torneoId") int torneoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND p.id_partido = :partidoId " +
        "AND e.tipo_evento = 'ATAQUE_EXITOSO'", nativeQuery = true)
    List<Evento> findAtaquesExitososByEquipoAndPartido(
        @Param("equipoId") int equipoId,
        @Param("partidoId") int partidoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND e.tipo_evento = 'ATAQUE_EXITOSO'", nativeQuery = true)
    List<Evento> findAtaquesExitososByEquipo(
        @Param("equipoId") int equipoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "JOIN cdo.torneo t ON p.torneo_id = t.id_torneo " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND t.id_torneo = :torneoId " +
        "AND e.tipo_evento = 'ATAQUE_FALLIDO'", nativeQuery = true)
    List<Evento> findAtaquesFallidosByEquipoAndTorneo(
        @Param("equipoId") int equipoId,
        @Param("torneoId") int torneoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND p.id_partido = :partidoId " +
        "AND e.tipo_evento = 'ATAQUE_FALLIDO'", nativeQuery = true)
    List<Evento> findAtaquesFallidosByEquipoAndPartido(
        @Param("equipoId") int equipoId,
        @Param("partidoId") int partidoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND e.tipo_evento = 'ATAQUE_FALLIDO'", nativeQuery = true)
    List<Evento> findAtaquesFallidosByEquipo(
        @Param("equipoId") int equipoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "JOIN cdo.torneo t ON p.torneo_id = t.id_torneo " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND t.id_torneo = :torneoId " +
        "AND e.tipo_evento = 'SAQUE_EXITOSO'", nativeQuery = true)
    List<Evento> findSaquesExitososByEquipoAndTorneo(
        @Param("equipoId") int equipoId,
        @Param("torneoId") int torneoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND p.id_partido = :partidoId " +
        "AND e.tipo_evento = 'SAQUE_EXITOSO'", nativeQuery = true)
    List<Evento> findSaquesExitososByEquipoAndPartido(
        @Param("equipoId") int equipoId,
        @Param("partidoId") int partidoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND e.tipo_evento = 'SAQUE_EXITOSO'", nativeQuery = true)
    List<Evento> findSaquesExitososByEquipo(
        @Param("equipoId") int equipoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "JOIN cdo.torneo t ON p.torneo_id = t.id_torneo " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND t.id_torneo = :torneoId " +
        "AND e.tipo_evento = 'SAQUE_FALLIDO'", nativeQuery = true)
    List<Evento> findSaquesFallidosByEquipoAndTorneo(
        @Param("equipoId") int equipoId,
        @Param("torneoId") int torneoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND p.id_partido = :partidoId " +
        "AND e.tipo_evento = 'SAQUE_FALLIDO'", nativeQuery = true)
    List<Evento> findSaquesFallidosByEquipoAndPartido(
        @Param("equipoId") int equipoId,
        @Param("partidoId") int partidoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND e.tipo_evento = 'SAQUE_FALLIDO'", nativeQuery = true)
    List<Evento> findSaquesFallidosByEquipo(
        @Param("equipoId") int equipoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "JOIN cdo.torneo t ON p.torneo_id = t.id_torneo " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND t.id_torneo = :torneoId " +
        "AND e.tipo_evento = 'BLOQUEO_EXITOSO'", nativeQuery = true)
    List<Evento> findBloqueosExitososByEquipoAndTorneo(
        @Param("equipoId") int equipoId,
        @Param("torneoId") int torneoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND p.id_partido = :partidoId " +
        "AND e.tipo_evento = 'BLOQUEO_EXITOSO'", nativeQuery = true)
    List<Evento> findBloqueosExitososByEquipoAndPartido(
        @Param("equipoId") int equipoId,
        @Param("partidoId") int partidoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND e.tipo_evento = 'BLOQUEO_EXITOSO'", nativeQuery = true)
    List<Evento> findBloqueosExitososByEquipo(
        @Param("equipoId") int equipoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "JOIN cdo.torneo t ON p.torneo_id = t.id_torneo " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND t.id_torneo = :torneoId " +
        "AND e.tipo_evento = 'ADVERTENCIA'", nativeQuery = true)
    List<Evento> findAdvertenciasByEquipoAndTorneo(
        @Param("equipoId") int equipoId,
        @Param("torneoId") int torneoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND p.id_partido = :partidoId " +
        "AND e.tipo_evento = 'ADVERTENCIA'", nativeQuery = true)
    List<Evento> findAdvertenciasByEquipoAndPartido(
        @Param("equipoId") int equipoId,
        @Param("partidoId") int partidoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND e.tipo_evento = 'ADVERTENCIA'", nativeQuery = true)
    List<Evento> findAdvertenciasByEquipo(
        @Param("equipoId") int equipoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "JOIN cdo.torneo t ON p.torneo_id = t.id_torneo " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND t.id_torneo = :torneoId " +
        "AND e.tipo_evento = 'DESCALIFICACION'", nativeQuery = true)
    List<Evento> findDescalificacionesByEquipoAndTorneo(
        @Param("equipoId") int equipoId,
        @Param("torneoId") int torneoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND p.id_partido = :partidoId " +
        "AND e.tipo_evento = 'DESCALIFICACION'", nativeQuery = true)
    List<Evento> findDescalificacionesByEquipoAndPartido(
        @Param("equipoId") int equipoId,
        @Param("partidoId") int partidoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND e.tipo_evento = 'DESCALIFICACION'", nativeQuery = true)
    List<Evento> findDescalificacionesByEquipo(
        @Param("equipoId") int equipoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "JOIN cdo.torneo t ON p.torneo_id = t.id_torneo " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND t.id_torneo = :torneoId " +
        "AND e.tipo_evento = 'PENALIZACION'", nativeQuery = true)
    List<Evento> findPenalizacionesByEquipoAndTorneo(
        @Param("equipoId") int equipoId,
        @Param("torneoId") int torneoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "JOIN cdo.partido p ON ljp.partido_id = p.id_partido " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND p.id_partido = :partidoId " +
        "AND e.tipo_evento = 'PENALIZACION'", nativeQuery = true)
    List<Evento> findPenalizacionesByEquipoAndPartido(
        @Param("equipoId") int equipoId,
        @Param("partidoId") int partidoId
    );

    @Query(value = "SELECT e.* FROM cdo.evento e " +
        "JOIN cdo.jugador_partido jp ON e.jugador_partido_id = jp.id_jugador_partido " +
        "JOIN cdo.lista_jugadores_partido ljp ON jp.lista_jugadores_partido_id = ljp.id_lista_jugadores_partido " +
        "JOIN cdo.equipo eq ON ljp.equipo_id = eq.id_equipo " +
        "WHERE eq.id_equipo = :equipoId " +
        "AND e.tipo_evento = 'PENALIZACION'", nativeQuery = true)
    List<Evento> findPenalizacionesByEquipo(
        @Param("equipoId") int equipoId
    );

}