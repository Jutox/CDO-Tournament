package com.example.cdo_tournament_backend.repository;

import com.example.cdo_tournament_backend.model.*;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface PartidoRepository extends JpaRepository<Partido, Integer>{

    @Query(value = "SELECT p.* FROM cdo.partido p " +
        "WHERE p.id_torneo = :torneoId ", nativeQuery = true)
    List<Partido> findPartidosByTorneo(
        @Param("torneoId") int torneoId
    );

}