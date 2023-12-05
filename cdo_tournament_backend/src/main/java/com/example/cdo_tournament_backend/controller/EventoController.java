package com.example.cdo_tournament_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cdo_tournament_backend.dto.EventoDTO;
import com.example.cdo_tournament_backend.service.EventoImpl;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/evento")
public class EventoController {

    @Autowired
    private EventoImpl eventoService;

    @GetMapping("/eventos")
    public ResponseEntity<List<EventoDTO>> getEventos() {
        try {
            List<EventoDTO> list = eventoService.getAllEventos();
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<EventoDTO> createEvento(@RequestBody EventoDTO eventoDTO) {
        try {
            EventoDTO retorno = eventoService.createEvento(eventoDTO);
            return new ResponseEntity<>(retorno, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventoDTO> getEventoById(@PathVariable int id) {
        try {
            EventoDTO eventoDTO = eventoService.getEventoById(id);

            if (eventoDTO != null) {
                return new ResponseEntity<>(eventoDTO, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventoDTO> updateEvento(@PathVariable int id, @RequestBody EventoDTO eventoDTO) {
        try {
            EventoDTO eventoDTOExistente = eventoService.getEventoById(id);
            if (eventoDTOExistente != null) {
                EventoDTO eventoActualizado = eventoService.updateEvento(id, eventoDTO);
                return new ResponseEntity<>(eventoActualizado, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEvento(@PathVariable int id) {
        try {
            EventoDTO eventoDTOExistente = eventoService.getEventoById(id);
            if (eventoDTOExistente != null) {
                eventoService.deleteEvento(id);
                return ResponseEntity.noContent().build(); // Responde con 204 (No Content) en caso de éxito.
            } else {
                return ResponseEntity.notFound().build(); // 404 - Not Found
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones generales
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 - Internal Server Error
        }
    }
    
    @GetMapping("/eventosBySet/{idSet}")
    public ResponseEntity<List<EventoDTO>> getEventosByIdSet(@PathVariable int idSet) {
        try {
            List<EventoDTO> list = eventoService.getEventosByIdSet(idSet);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/ataquesExitososJugadorTorneo/{idJugador}/{idTorneo}")
    public ResponseEntity<List<EventoDTO>> getAtaquesExitososByIdJugadorIdTorneo(@PathVariable int idJugador, @PathVariable int idTorneo) {
        try {
            List<EventoDTO> list = eventoService.getAtaquesExitososByIdJugadorIdTorneo(idJugador, idTorneo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ataquesExitososJugadorPartido/{idJugador}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getAtaquesExitososByIdJugadorIdPartido(@PathVariable int idJugador, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getAtaquesExitososByIdJugadorIdPartido(idJugador, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ataquesExitososJugador/{idJugador}")
    public ResponseEntity<List<EventoDTO>> getAtaquesExitososByIdJugador(@PathVariable int idJugador) {
        try {
            List<EventoDTO> list = eventoService.getAtaquesExitososByIdJugador(idJugador);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ataquesFallidosJugadorTorneo/{idJugador}/{idTorneo}")
    public ResponseEntity<List<EventoDTO>> getAtaquesFallidosByIdJugadorIdTorneo(@PathVariable int idJugador, @PathVariable int idTorneo) {
        try {
            List<EventoDTO> list = eventoService.getAtaquesFallidosByIdJugadorIdTorneo(idJugador, idTorneo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ataquesFallidosJugadorPartido/{idJugador}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getAtaquesFallidosByIdJugadorIdPartido(@PathVariable int idJugador, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getAtaquesFallidosByIdJugadorIdPartido(idJugador, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ataquesFallidosJugador/{idJugador}")
    public ResponseEntity<List<EventoDTO>> getAtaquesFallidosByIdJugador(@PathVariable int idJugador) {
        try {
            List<EventoDTO> list = eventoService.getAtaquesFallidosByIdJugador(idJugador);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/saquesExitososJugadorTorneo/{idJugador}/{idTorneo}")
    public ResponseEntity<List<EventoDTO>> getSaquesExitososByIdJugadorIdTorneo(@PathVariable int idJugador, @PathVariable int idTorneo) {
        try {
            List<EventoDTO> list = eventoService.getSaquesExitososByIdJugadorIdTorneo(idJugador, idTorneo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/saquesExitososJugadorPartido/{idJugador}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getSaquesExitososByIdJugadorIdPartido(@PathVariable int idJugador, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getSaquesExitososByIdJugadorIdPartido(idJugador, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/saquesExitososJugador/{idJugador}")
    public ResponseEntity<List<EventoDTO>> getSaquesExitososByIdJugador(@PathVariable int idJugador) {
        try {
            List<EventoDTO> list = eventoService.getSaquesExitososByIdJugador(idJugador);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/saquesFallidosJugadorTorneo/{idJugador}/{idTorneo}")
    public ResponseEntity<List<EventoDTO>> getSaquesFallidosByIdJugadorIdTorneo(@PathVariable int idJugador, @PathVariable int idTorneo) {
        try {
            List<EventoDTO> list = eventoService.getSaquesFallidosByIdJugadorIdTorneo(idJugador, idTorneo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/saquesFallidosJugadorPartido/{idJugador}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getSaquesFallidosByIdJugadorIdPartido(@PathVariable int idJugador, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getSaquesFallidosByIdJugadorIdPartido(idJugador, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/saquesFallidosJugador/{idJugador}")
    public ResponseEntity<List<EventoDTO>> getSaquesFallidosByIdJugador(@PathVariable int idJugador) {
        try {
            List<EventoDTO> list = eventoService.getSaquesFallidosByIdJugador(idJugador);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/bloqueosExitososJugadorTorneo/{idJugador}/{idTorneo}")
    public ResponseEntity<List<EventoDTO>> getBloqueosExitososByIdJugadorIdTorneo(@PathVariable int idJugador, @PathVariable int idTorneo) {
        try {
            List<EventoDTO> list = eventoService.getBloqueosExitososByIdJugadorIdTorneo(idJugador, idTorneo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/bloqueosExitososJugadorPartido/{idJugador}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getBloqueosExitososByIdJugadorIdPartido(@PathVariable int idJugador, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getBloqueosExitososByIdJugadorIdPartido(idJugador, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/bloqueosExitososJugador/{idJugador}")
    public ResponseEntity<List<EventoDTO>> getBloqueosExitososByIdJugador(@PathVariable int idJugador) {
        try {
            List<EventoDTO> list = eventoService.getBloqueosExitososByIdJugador(idJugador);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/advertenciasJugadorTorneo/{idJugador}/{idTorneo}")
    public ResponseEntity<List<EventoDTO>> getAdvertenciasByIdJugadorIdTorneo(@PathVariable int idJugador, @PathVariable int idTorneo) {
        try {
            List<EventoDTO> list = eventoService.getAdvertenciasByIdJugadorIdTorneo(idJugador, idTorneo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/advertenciasJugadorPartido/{idJugador}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getAdvertenciasByIdJugadorIdPartido(@PathVariable int idJugador, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getAdvertenciasByIdJugadorIdPartido(idJugador, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/advertenciasJugador/{idJugador}")
    public ResponseEntity<List<EventoDTO>> getAdvertenciasByIdJugador(@PathVariable int idJugador) {
        try {
            List<EventoDTO> list = eventoService.getAdvertenciasByIdJugador(idJugador);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/descalificacionesJugadorTorneo/{idJugador}/{idTorneo}")
    public ResponseEntity<List<EventoDTO>> getDescalificacionesByIdJugadorIdTorneo(@PathVariable int idJugador, @PathVariable int idTorneo) {
        try {
            List<EventoDTO> list = eventoService.getDescalificacionesByIdJugadorIdTorneo(idJugador, idTorneo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/descalificacionesJugadorPartido/{idJugador}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getDescalificacionesByIdJugadorIdPartido(@PathVariable int idJugador, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getDescalificacionesByIdJugadorIdPartido(idJugador, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/descalificacionesJugador/{idJugador}")
    public ResponseEntity<List<EventoDTO>> getDescalificacionesByIdJugador(@PathVariable int idJugador) {
        try {
            List<EventoDTO> list = eventoService.getDescalificacionesByIdJugador(idJugador);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/penalizacionesJugadorTorneo/{idJugador}/{idTorneo}")
    public ResponseEntity<List<EventoDTO>> getPenalizacionesByIdJugadorIdTorneo(@PathVariable int idJugador, @PathVariable int idTorneo) {
        try {
            List<EventoDTO> list = eventoService.getPenalizacionesByIdJugadorIdTorneo(idJugador, idTorneo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/penalizacionesJugadorPartido/{idJugador}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getPenalizacionesByIdJugadorIdPartido(@PathVariable int idJugador, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getPenalizacionesByIdJugadorIdPartido(idJugador, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/penalizacionesJugador/{idJugador}")
    public ResponseEntity<List<EventoDTO>> getPenalizacionesByIdJugador(@PathVariable int idJugador) {
        try {
            List<EventoDTO> list = eventoService.getPenalizacionesByIdJugador(idJugador);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ataquesExitososEquipoTorneo/{idEquipo}/{idTorneo}")
    public ResponseEntity<List<EventoDTO>> getAtaquesExitososByIdEquipoIdTorneo(@PathVariable int idEquipo, @PathVariable int idTorneo) {
        try {
            List<EventoDTO> list = eventoService.getAtaquesExitososByIdEquipoIdTorneo(idEquipo, idTorneo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ataquesExitososEquipoPartido/{idEquipo}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getAtaquesExitososByIdEquipoIdPartido(@PathVariable int idEquipo, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getAtaquesExitososByIdEquipoIdPartido(idEquipo, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ataquesExitososEquipo/{idEquipo}")
    public ResponseEntity<List<EventoDTO>> getAtaquesExitososByIdEquipo(@PathVariable int idEquipo) {
        try {
            List<EventoDTO> list = eventoService.getAtaquesExitososByIdEquipo(idEquipo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ataquesFallidosEquipoTorneo/{idEquipo}/{idTorneo}")
    public ResponseEntity<List<EventoDTO>> getAtaquesFallidosByIdEquipoIdTorneo(@PathVariable int idEquipo, @PathVariable int idTorneo) {
        try {
            List<EventoDTO> list = eventoService.getAtaquesFallidosByIdEquipoIdTorneo(idEquipo, idTorneo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ataquesFallidosEquipoPartido/{idEquipo}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getAtaquesFallidosByIdEquipoIdPartido(@PathVariable int idEquipo, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getAtaquesFallidosByIdEquipoIdPartido(idEquipo, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ataquesFallidosEquipo/{idEquipo}")
    public ResponseEntity<List<EventoDTO>> getAtaquesFallidosByIdEquipo(@PathVariable int idEquipo) {
        try {
            List<EventoDTO> list = eventoService.getAtaquesFallidosByIdEquipo(idEquipo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/saquesExitososEquipoTorneo/{idEquipo}/{idTorneo}")
    public ResponseEntity<List<EventoDTO>> getSaquesExitososByIdEquipoIdTorneo(@PathVariable int idEquipo, @PathVariable int idTorneo) {
        try {
            List<EventoDTO> list = eventoService.getSaquesExitososByIdEquipoIdTorneo(idEquipo, idTorneo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/saquesExitososEquipoPartido/{idEquipo}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getSaquesExitososByIdEquipoIdPartido(@PathVariable int idEquipo, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getSaquesExitososByIdEquipoIdPartido(idEquipo, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/saquesExitososEquipo/{idEquipo}")
    public ResponseEntity<List<EventoDTO>> getSaquesExitososByIdEquipo(@PathVariable int idEquipo) {
        try {
            List<EventoDTO> list = eventoService.getSaquesExitososByIdEquipo(idEquipo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/saquesFallidosEquipoTorneo/{idEquipo}/{idTorneo}")
    public ResponseEntity<List<EventoDTO>> getSaquesFallidosByIdEquipoIdTorneo(@PathVariable int idEquipo, @PathVariable int idTorneo) {
        try {
            List<EventoDTO> list = eventoService.getSaquesFallidosByIdEquipoIdTorneo(idEquipo, idTorneo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/saquesFallidosEquipoPartido/{idEquipo}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getSaquesFallidosByIdEquipoIdPartido(@PathVariable int idEquipo, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getSaquesFallidosByIdEquipoIdPartido(idEquipo, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/saquesFallidosEquipo/{idEquipo}")
    public ResponseEntity<List<EventoDTO>> getSaquesFallidosByIdEquipo(@PathVariable int idEquipo) {
        try {
            List<EventoDTO> list = eventoService.getSaquesFallidosByIdEquipo(idEquipo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/bloqueosExitososEquipoTorneo/{idEquipo}/{idTorneo}")
    public ResponseEntity<List<EventoDTO>> getBloqueosExitososByIdEquipoIdTorneo(@PathVariable int idEquipo, @PathVariable int idTorneo) {
        try {
            List<EventoDTO> list = eventoService.getBloqueosExitososByIdEquipoIdTorneo(idEquipo, idTorneo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/bloqueosExitososEquipoPartido/{idEquipo}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getBloqueosExitososByIdEquipoIdPartido(@PathVariable int idEquipo, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getBloqueosExitososByIdEquipoIdPartido(idEquipo, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/bloqueosExitososEquipo/{idEquipo}")
    public ResponseEntity<List<EventoDTO>> getBloqueosExitososByIdEquipo(@PathVariable int idEquipo) {
        try {
            List<EventoDTO> list = eventoService.getBloqueosExitososByIdEquipo(idEquipo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/advertenciasEquipoTorneo/{idEquipo}/{idTorneo}")
    public ResponseEntity<List<EventoDTO>> getAdvertenciasByIdEquipoIdTorneo(@PathVariable int idEquipo, @PathVariable int idTorneo) {
        try {
            List<EventoDTO> list = eventoService.getAdvertenciasByIdEquipoIdTorneo(idEquipo, idTorneo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/advertenciasEquipoPartido/{idEquipo}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getAdvertenciasByIdEquipoIdPartido(@PathVariable int idEquipo, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getAdvertenciasByIdEquipoIdPartido(idEquipo, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/advertenciasEquipo/{idEquipo}")
    public ResponseEntity<List<EventoDTO>> getAdvertenciasByIdEquipo(@PathVariable int idEquipo) {
        try {
            List<EventoDTO> list = eventoService.getAdvertenciasByIdEquipo(idEquipo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/descalificacionesEquipoTorneo/{idEquipo}/{idTorneo}")
    public ResponseEntity<List<EventoDTO>> getDescalificacionesByIdEquipoIdTorneo(@PathVariable int idEquipo, @PathVariable int idTorneo) {
        try {
            List<EventoDTO> list = eventoService.getDescalificacionesByIdEquipoIdTorneo(idEquipo, idTorneo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/descalificacionesEquipoPartido/{idEquipo}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getDescalificacionesByIdEquipoIdPartido(@PathVariable int idEquipo, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getDescalificacionesByIdEquipoIdPartido(idEquipo, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/descalificacionesEquipo/{idEquipo}")
    public ResponseEntity<List<EventoDTO>> getDescalificacionesByIdEquipo(@PathVariable int idEquipo) {
        try {
            List<EventoDTO> list = eventoService.getDescalificacionesByIdEquipo(idEquipo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/penalizacionesEquipoTorneo/{idEquipo}/{idTorneo}")
    public ResponseEntity<List<EventoDTO>> getPenalizacionesByIdEquipoIdTorneo(@PathVariable int idEquipo, @PathVariable int idTorneo) {
        try {
            List<EventoDTO> list = eventoService.getPenalizacionesByIdEquipoIdTorneo(idEquipo, idTorneo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/penalizacionesEquipoPartido/{idEquipo}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getPenalizacionesByIdEquipoIdPartido(@PathVariable int idEquipo, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getPenalizacionesByIdEquipoIdPartido(idEquipo, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/penalizacionesEquipo/{idEquipo}")
    public ResponseEntity<List<EventoDTO>> getPenalizacionesByIdEquipo(@PathVariable int idEquipo) {
        try {
            List<EventoDTO> list = eventoService.getPenalizacionesByIdEquipo(idEquipo);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}