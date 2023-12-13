package com.example.cdo_tournament_backend.repository;

import com.example.cdo_tournament_backend.model.*;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface EquipoRepository extends JpaRepository<Equipo, Integer>{

    

}