package com.example.cdo_tournament_backend.repository;

import com.example.cdo_tournament_backend.model.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SetRepository extends JpaRepository<Set, Integer>{

    

}