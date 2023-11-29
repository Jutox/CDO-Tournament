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
    
    @GetMapping("/ataquesExitosos/{idJugador}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getAtaquesExitososByIdJugadorIdPartido(@PathVariable int idJugador, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getAtaquesExitososByIdJugadorIdPartido(idJugador, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ataquesExitosos/{idJugador}")
    public ResponseEntity<List<EventoDTO>> getAtaquesExitososByIdJugador(@PathVariable int idJugador) {
        try {
            List<EventoDTO> list = eventoService.getAtaquesExitososByIdJugador(idJugador);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ataquesFallidos/{idJugador}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getAtaquesFallidosByIdJugadorIdPartido(@PathVariable int idJugador, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getAtaquesFallidosByIdJugadorIdPartido(idJugador, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ataquesFallidos/{idJugador}")
    public ResponseEntity<List<EventoDTO>> getAtaquesFallidosByIdJugador(@PathVariable int idJugador) {
        try {
            List<EventoDTO> list = eventoService.getAtaquesFallidosByIdJugador(idJugador);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/saquesExitosos/{idJugador}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getSaquesExitososByIdJugadorIdPartido(@PathVariable int idJugador, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getSaquesExitososByIdJugadorIdPartido(idJugador, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/saquesExitosos/{idJugador}")
    public ResponseEntity<List<EventoDTO>> getSaquesExitososByIdJugador(@PathVariable int idJugador) {
        try {
            List<EventoDTO> list = eventoService.getSaquesExitososByIdJugador(idJugador);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/saquesFallidos/{idJugador}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getSaquesFallidosByIdJugadorIdPartido(@PathVariable int idJugador, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getSaquesFallidosByIdJugadorIdPartido(idJugador, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/saquesFallidos/{idJugador}")
    public ResponseEntity<List<EventoDTO>> getSaquesFallidosByIdJugador(@PathVariable int idJugador) {
        try {
            List<EventoDTO> list = eventoService.getSaquesFallidosByIdJugador(idJugador);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/bloqueosExitosos/{idJugador}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getBloqueosExitososByIdJugadorIdPartido(@PathVariable int idJugador, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getBloqueosExitososByIdJugadorIdPartido(idJugador, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/bloqueosExitosos/{idJugador}")
    public ResponseEntity<List<EventoDTO>> getBloqueosExitososByIdJugador(@PathVariable int idJugador) {
        try {
            List<EventoDTO> list = eventoService.getBloqueosExitososByIdJugador(idJugador);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/advertencias/{idJugador}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getAdvertenciasByIdJugadorIdPartido(@PathVariable int idJugador, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getAdvertenciasByIdJugadorIdPartido(idJugador, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/advertencias/{idJugador}")
    public ResponseEntity<List<EventoDTO>> getAdvertenciasByIdJugador(@PathVariable int idJugador) {
        try {
            List<EventoDTO> list = eventoService.getAdvertenciasByIdJugador(idJugador);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/descalificaciones/{idJugador}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getDescalificacionesByIdJugadorIdPartido(@PathVariable int idJugador, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getDescalificacionesByIdJugadorIdPartido(idJugador, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/descalificaciones/{idJugador}")
    public ResponseEntity<List<EventoDTO>> getDescalificacionesByIdJugador(@PathVariable int idJugador) {
        try {
            List<EventoDTO> list = eventoService.getDescalificacionesByIdJugador(idJugador);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/penalizaciones/{idJugador}/{idPartido}")
    public ResponseEntity<List<EventoDTO>> getPenalizacionesByIdJugadorIdPartido(@PathVariable int idJugador, @PathVariable int idPartido) {
        try {
            List<EventoDTO> list = eventoService.getPenalizacionesByIdJugadorIdPartido(idJugador, idPartido);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/penalizaciones/{idJugador}")
    public ResponseEntity<List<EventoDTO>> getPenalizacionesByIdJugador(@PathVariable int idJugador) {
        try {
            List<EventoDTO> list = eventoService.getPenalizacionesByIdJugador(idJugador);
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            ex.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}