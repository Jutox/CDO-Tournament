package com.example.cdo_tournament_backend.service;

import java.util.List;

import com.example.cdo_tournament_backend.dto.ListaJugadoresPartidoDTO;

public interface ListaJugadoresPartidoService {

    List<ListaJugadoresPartidoDTO> getAllListasJugadoresPartido();
    ListaJugadoresPartidoDTO createListaJugadoresPartido(ListaJugadoresPartidoDTO listaJugadoresPartidoDTO);
    ListaJugadoresPartidoDTO getListaJugadoresPartidoById(int id);
    ListaJugadoresPartidoDTO updateListaJugadoresPartido(int id, ListaJugadoresPartidoDTO listaJugadoresPartidoDTO);
    void deleteListaJugadoresPartido(int id);

}