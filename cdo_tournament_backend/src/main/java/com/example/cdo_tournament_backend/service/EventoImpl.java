package com.example.cdo_tournament_backend.service;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cdo_tournament_backend.dto.EventoDTO;
import com.example.cdo_tournament_backend.mapper.EventoMapper;
import com.example.cdo_tournament_backend.model.Evento;
import com.example.cdo_tournament_backend.repository.EventoRepository;


@Service
@Transactional
public class EventoImpl implements EventoService{

    @Autowired
    private EventoRepository eventoRepository; // Repositorio para acceder a los datos de los eventos

    @Autowired
    private EventoMapper eventoMapper; // Mapeador para convertir entre entidades y DTOs

    @Override
    public List<EventoDTO> getAllEventos() {
        List<Evento> eventosDB = eventoRepository.findAll();
        List<EventoDTO> retornoDTO = eventosDB.stream()
                .map(eventoMapper::toDTO)
                .collect(Collectors.toList());
        return retornoDTO;
    }

    @Override
    public EventoDTO createEvento(EventoDTO eventoDTO) {
        // Convierte el DTO a una entidad Evento usando el EventoMapper
        Evento evento = eventoMapper.toEntity(eventoDTO);
        // Guarda la entidad en la base de datos
        evento = eventoRepository.save(evento);
        // Convierte la entidad nuevamente a DTO y devuélvela
        return eventoMapper.toDTO(evento);
    }

    @Override
    public EventoDTO getEventoById(int id) {
        Optional<Evento> evento = eventoRepository.findById(id);
        return evento.map(eventoMapper::toDTO).orElse(null);
    }

    @Override
    public EventoDTO updateEvento(int id, EventoDTO eventoDTO) {
        Evento nuevo = eventoMapper.toEntity(eventoDTO);
        Evento existente = eventoRepository.findById(id).orElse(null);
        if (existente != null) {
            // Actualiza los atributos de la entidad con los valores del DTO
            existente.setHora(nuevo.getHora());
            existente.setTipo(nuevo.getTipo());
            existente.setPuntos(nuevo.getPuntos());
            existente.setOrdenServicio(nuevo.getOrdenServicio());
            existente.setRondaServicio(nuevo.getRondaServicio());
            existente.setSetPartido(nuevo.getSetPartido());
            existente.setJugadorPartido(nuevo.getJugadorPartido());
            
            // Guarda la entidad actualizada en la base de datos
            existente = eventoRepository.save(existente);
            // Convierte la entidad nuevamente a DTO y devuélvela
            return eventoMapper.toDTO(existente);
        } else {
            return null; // Retorna null si el evento no existe
        }
    }

    @Override
    public void deleteEvento(int id) {
        eventoRepository.deleteById(id); // Elimina un evento por su ID
    }

    @Override
    public List<EventoDTO> getAtaquesExitososByIdJugadorIdTorneo(int idJugador, int idTorneo) {
        List<Evento> eventosDB = eventoRepository.findAtaquesExitososByJugadorAndTorneo(idJugador,idTorneo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;
    }

    @Override
    public List<EventoDTO> getAtaquesExitososByIdJugadorIdPartido(int idJugador, int idPartido) {
        List<Evento> eventosDB = eventoRepository.findAtaquesExitososByJugadorAndPartido(idJugador,idPartido);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;
    }

    @Override
    public List<EventoDTO> getAtaquesExitososByIdJugador(int idJugador) {
        List<Evento> eventosDB = eventoRepository.findAtaquesExitososByJugador(idJugador);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;
    }

    @Override
    public List<EventoDTO> getAtaquesFallidosByIdJugadorIdTorneo(int idJugador, int idTorneo) {
        List<Evento> eventosDB = eventoRepository.findAtaquesFallidosByJugadorAndTorneo(idJugador, idTorneo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;   
    }

    @Override
    public List<EventoDTO> getAtaquesFallidosByIdJugadorIdPartido(int idJugador, int idPartido) {
        List<Evento> eventosDB = eventoRepository.findAtaquesFallidosByJugadorAndPartido(idJugador, idPartido);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;   
    }

    @Override
    public List<EventoDTO> getAtaquesFallidosByIdJugador(int idJugador) {
        List<Evento> eventosDB = eventoRepository.findAtaquesFallidosByJugador(idJugador);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;   
    }

    @Override
    public List<EventoDTO> getSaquesExitososByIdJugadorIdTorneo(int idJugador, int idTorneo) {
        List<Evento> eventosDB = eventoRepository.findSaquesExitososByJugadorAndTorneo(idJugador, idTorneo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;   
    }

    @Override
    public List<EventoDTO> getSaquesExitososByIdJugadorIdPartido(int idJugador, int idPartido) {
        List<Evento> eventosDB = eventoRepository.findSaquesExitososByJugadorAndPartido(idJugador, idPartido);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;   
    }

    @Override
    public List<EventoDTO> getSaquesExitososByIdJugador(int idJugador) {
        List<Evento> eventosDB = eventoRepository.findSaquesExitososByJugador(idJugador);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;  
    }

    @Override
    public List<EventoDTO> getSaquesFallidosByIdJugadorIdTorneo(int idJugador, int idTorneo) {
        List<Evento> eventosDB = eventoRepository.findSaquesFallidosByJugadorAndTorneo(idJugador, idTorneo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getSaquesFallidosByIdJugadorIdPartido(int idJugador, int idPartido) {
        List<Evento> eventosDB = eventoRepository.findSaquesFallidosByJugadorAndPartido(idJugador, idPartido);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getSaquesFallidosByIdJugador(int idJugador) {
        List<Evento> eventosDB = eventoRepository.findSaquesFallidosByJugador(idJugador);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getBloqueosExitososByIdJugadorIdTorneo(int idJugador, int idTorneo) {
        List<Evento> eventosDB = eventoRepository.findBloqueosExitososByJugadorAndTorneo(idJugador, idTorneo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getBloqueosExitososByIdJugadorIdPartido(int idJugador, int idPartido) {
        List<Evento> eventosDB = eventoRepository.findBloqueosExitososByJugadorAndPartido(idJugador, idPartido);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getBloqueosExitososByIdJugador(int idJugador) {
        List<Evento> eventosDB = eventoRepository.findBloqueosExitososByJugador(idJugador);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getAdvertenciasByIdJugadorIdTorneo(int idJugador, int idTorneo) {
        List<Evento> eventosDB = eventoRepository.findAdvertenciasByJugadorAndTorneo(idJugador, idTorneo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getAdvertenciasByIdJugadorIdPartido(int idJugador, int idPartido) {
        List<Evento> eventosDB = eventoRepository.findAdvertenciasByJugadorAndPartido(idJugador, idPartido);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getAdvertenciasByIdJugador(int idJugador) {
        List<Evento> eventosDB = eventoRepository.findAdvertenciasByJugador(idJugador);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getDescalificacionesByIdJugadorIdTorneo(int idJugador, int idTorneo) {
        List<Evento> eventosDB = eventoRepository.findDescalificacionesByJugadorAndTorneo(idJugador, idTorneo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getDescalificacionesByIdJugadorIdPartido(int idJugador, int idPartido) {
        List<Evento> eventosDB = eventoRepository.findDescalificacionesByJugadorAndPartido(idJugador, idPartido);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getDescalificacionesByIdJugador(int idJugador) {
        List<Evento> eventosDB = eventoRepository.findDescalificacionesByJugador(idJugador);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getPenalizacionesByIdJugadorIdTorneo(int idJugador, int idTorneo) {
        List<Evento> eventosDB = eventoRepository.findPenalizacionesByJugadorAndTorneo(idJugador, idTorneo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getPenalizacionesByIdJugadorIdPartido(int idJugador, int idPartido) {
        List<Evento> eventosDB = eventoRepository.findPenalizacionesByJugadorAndPartido(idJugador, idPartido);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getPenalizacionesByIdJugador(int idJugador) {
        List<Evento> eventosDB = eventoRepository.findPenalizacionesByJugador(idJugador);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getAtaquesExitososByIdEquipoIdTorneo(int idEquipo, int idTorneo) {
        List<Evento> eventosDB = eventoRepository.findAtaquesExitososByEquipoAndTorneo(idEquipo,idTorneo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;
    }

    @Override
    public List<EventoDTO> getAtaquesExitososByIdEquipoIdPartido(int idEquipo, int idPartido) {
        List<Evento> eventosDB = eventoRepository.findAtaquesExitososByEquipoAndPartido(idEquipo,idPartido);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;
    }

    @Override
    public List<EventoDTO> getAtaquesExitososByIdEquipo(int idEquipo) {
        List<Evento> eventosDB = eventoRepository.findAtaquesExitososByEquipo(idEquipo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;
    }

    @Override
    public List<EventoDTO> getAtaquesFallidosByIdEquipoIdTorneo(int idEquipo, int idTorneo) {
        List<Evento> eventosDB = eventoRepository.findAtaquesFallidosByEquipoAndTorneo(idEquipo, idTorneo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;   
    }

    @Override
    public List<EventoDTO> getAtaquesFallidosByIdEquipoIdPartido(int idEquipo, int idPartido) {
        List<Evento> eventosDB = eventoRepository.findAtaquesFallidosByEquipoAndPartido(idEquipo, idPartido);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;   
    }

    @Override
    public List<EventoDTO> getAtaquesFallidosByIdEquipo(int idEquipo) {
        List<Evento> eventosDB = eventoRepository.findAtaquesFallidosByEquipo(idEquipo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;   
    }

    @Override
    public List<EventoDTO> getSaquesExitososByIdEquipoIdTorneo(int idEquipo, int idTorneo) {
        List<Evento> eventosDB = eventoRepository.findSaquesExitososByEquipoAndTorneo(idEquipo, idTorneo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;   
    }

    @Override
    public List<EventoDTO> getSaquesExitososByIdEquipoIdPartido(int idEquipo, int idPartido) {
        List<Evento> eventosDB = eventoRepository.findSaquesExitososByEquipoAndPartido(idEquipo, idPartido);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;   
    }

    @Override
    public List<EventoDTO> getSaquesExitososByIdEquipo(int idEquipo) {
        List<Evento> eventosDB = eventoRepository.findSaquesExitososByEquipo(idEquipo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO;  
    }

    @Override
    public List<EventoDTO> getSaquesFallidosByIdEquipoIdTorneo(int idEquipo, int idTorneo) {
        List<Evento> eventosDB = eventoRepository.findSaquesFallidosByEquipoAndTorneo(idEquipo, idTorneo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getSaquesFallidosByIdEquipoIdPartido(int idEquipo, int idPartido) {
        List<Evento> eventosDB = eventoRepository.findSaquesFallidosByEquipoAndPartido(idEquipo, idPartido);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getSaquesFallidosByIdEquipo(int idEquipo) {
        List<Evento> eventosDB = eventoRepository.findSaquesFallidosByEquipo(idEquipo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getBloqueosExitososByIdEquipoIdTorneo(int idEquipo, int idTorneo) {
        List<Evento> eventosDB = eventoRepository.findBloqueosExitososByEquipoAndTorneo(idEquipo, idTorneo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getBloqueosExitososByIdEquipoIdPartido(int idEquipo, int idPartido) {
        List<Evento> eventosDB = eventoRepository.findBloqueosExitososByEquipoAndPartido(idEquipo, idPartido);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getBloqueosExitososByIdEquipo(int idEquipo) {
        List<Evento> eventosDB = eventoRepository.findBloqueosExitososByEquipo(idEquipo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getAdvertenciasByIdEquipoIdTorneo(int idEquipo, int idTorneo) {
        List<Evento> eventosDB = eventoRepository.findAdvertenciasByEquipoAndTorneo(idEquipo, idTorneo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getAdvertenciasByIdEquipoIdPartido(int idEquipo, int idPartido) {
        List<Evento> eventosDB = eventoRepository.findAdvertenciasByEquipoAndPartido(idEquipo, idPartido);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getAdvertenciasByIdEquipo(int idEquipo) {
        List<Evento> eventosDB = eventoRepository.findAdvertenciasByEquipo(idEquipo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getDescalificacionesByIdEquipoIdTorneo(int idEquipo, int idTorneo) {
        List<Evento> eventosDB = eventoRepository.findDescalificacionesByEquipoAndTorneo(idEquipo, idTorneo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getDescalificacionesByIdEquipoIdPartido(int idEquipo, int idPartido) {
        List<Evento> eventosDB = eventoRepository.findDescalificacionesByEquipoAndPartido(idEquipo, idPartido);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getDescalificacionesByIdEquipo(int idEquipo) {
        List<Evento> eventosDB = eventoRepository.findDescalificacionesByEquipo(idEquipo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getPenalizacionesByIdEquipoIdTorneo(int idEquipo, int idTorneo) {
        List<Evento> eventosDB = eventoRepository.findPenalizacionesByEquipoAndTorneo(idEquipo, idTorneo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getPenalizacionesByIdEquipoIdPartido(int idEquipo, int idPartido) {
        List<Evento> eventosDB = eventoRepository.findPenalizacionesByEquipoAndPartido(idEquipo, idPartido);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }

    @Override
    public List<EventoDTO> getPenalizacionesByIdEquipo(int idEquipo) {
        List<Evento> eventosDB = eventoRepository.findPenalizacionesByEquipo(idEquipo);
        List<EventoDTO> retornoDTO = eventosDB.stream()
            .map(eventoMapper::toDTO)
            .collect(Collectors.toList());
        return retornoDTO; 
    }
}