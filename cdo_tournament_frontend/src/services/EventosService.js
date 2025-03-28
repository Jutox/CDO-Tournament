import axios from 'axios';

const EVENTO_API_BASE_URL = "http://localhost:8080/evento";

class EventoService {

    getEventos() {
        const url = `${EVENTO_API_BASE_URL}/eventos`;
        return axios.get(url);
    }

    createEvento(evento) {
        return axios.post(EVENTO_API_BASE_URL, evento);
    }

    getEventoById(eventoId) {
        const url = `${EVENTO_API_BASE_URL}/${eventoId}`;
        return axios.get(url);
    }

    getEventosByIdSet(setPartidoId) {
        const url = `${EVENTO_API_BASE_URL}/${setPartidoId}`;
        return axios.get(url);
    }


    updateEvento(eventoId, evento) {
        const url = `${EVENTO_API_BASE_URL}/${eventoId}`;
        return axios.put(url, evento);
    }

    deleteEvento(eventoId) {
        const url = `${EVENTO_API_BASE_URL}/${eventoId}`;
        return axios.delete(url);
    }

    /********************************************************************************************************************/

    //Eventos por Jugador y Partido
    getAtaquesExitososByIdJugadorIdPartido(jugadorId, partidoId) {
        const url = `${EVENTO_API_BASE_URL}/ataquesExitososJugadorPartido/${jugadorId}/${partidoId}`;
        return axios.get(url);
    }

    getAtaquesFallidosByIdJugadorIdPartido(jugadorId, partidoId) {
        const url = `${EVENTO_API_BASE_URL}/ataquesFallidosJugadorPartido/${jugadorId}/${partidoId}`;
        return axios.get(url);
    }

    getSaquesExitososByIdJugadorIdPartido(jugadorId, partidoId) {
        const url = `${EVENTO_API_BASE_URL}/saquesExitososJugadorPartido/${jugadorId}/${partidoId}`;
        return axios.get(url);
    }

    getSaquesFallidosByIdJugadorIdPartido(jugadorId, partidoId) {
        const url = `${EVENTO_API_BASE_URL}/saquesFallidosJugadorPartido/${jugadorId}/${partidoId}`;
        return axios.get(url);
    }

    /********************************************************************************************************************/

    //Eventos por Jugador y Torneo
    getAtaquesFallidosByIdJugadorIdTorneo(jugadorId, torneoId) {
        const url = `${EVENTO_API_BASE_URL}/ataquesFallidosJugadorTorneo/${jugadorId}/${torneoId}`;
        return axios.get(url);
    }

    getSaquesExitososByIdJugadorIdTorneo(jugadorId, torneoId) {
        const url = `${EVENTO_API_BASE_URL}/saquesExitososJugadorTorneo/${jugadorId}/${torneoId}`;
        return axios.get(url);
    }

    getSaquesExitososByIdJugadorIdTorneo(jugadorId, torneoId) {
        const url = `${EVENTO_API_BASE_URL}/saquesExitososJugadorTorneo/${jugadorId}/${torneoId}`;
        return axios.get(url);
    }

    getSaquesFallidosByIdJugadorIdTorneo(jugadorId, torneoId) {
        const url = `${EVENTO_API_BASE_URL}/saquesFallidosJugadorTorneo/${jugadorId}/${torneoId}`;
        return axios.get(url);
    }

    /********************************************************************************************************************/

    //Eventos por Jugador
    getAtaquesExitososByIdJugador(jugadorId) {
        const url = `${EVENTO_API_BASE_URL}/ataquesExitososJugador/${jugadorId}`;
        return axios.get(url);
    }

    getAtaquesFallidosByIdJugador(jugadorId) {
        const url = `${EVENTO_API_BASE_URL}/ataquesFallidosJugador/${jugadorId}`;
        return axios.get(url);
    }

    getSaquesExitososByIdJugador(jugadorId) {
        const url = `${EVENTO_API_BASE_URL}/saquesExitososJugador/${jugadorId}`;
        return axios.get(url);
    }

    getSaquesFallidosByIdJugador(jugadorId) {
        const url = `${EVENTO_API_BASE_URL}/saquesFallidosJugador/${jugadorId}`;
        return axios.get(url);
    }

    getBloqueosExitososByIdJugador(jugadorId) {
        const url = `${EVENTO_API_BASE_URL}/bloqueosExitososJugador/${jugadorId}`;
        return axios.get(url);
    }


    /********************************************************************************************************************/

    getAdvertenciasByIdJugador(jugadorId) {
        const url = `${EVENTO_API_BASE_URL}/advertenciasJugador/${jugadorId}`;
        return axios.get(url);
    }

    getDescalificacionesByIdJugador(jugadorId) {
        const url = `${EVENTO_API_BASE_URL}/descalificacionesJugador/${jugadorId}`;
        return axios.get(url);
    }

    getPenalizacionesByIdJugador(jugadorId) {
        const url = `${EVENTO_API_BASE_URL}/penalizacionesJugador/${jugadorId}`;
        return axios.get(url);
    }

    getEventosByIdSet(setPartidoId) {
        const url = `${EVENTO_API_BASE_URL}/eventosBySet/${setPartidoId}`;
        return axios.get(url);
    }

    /********************************************************************************************************************/

    //Eventos por Equipo
    getAtaquesExitososByIdEquipo(equipoId) {
        const url = `${EVENTO_API_BASE_URL}/ataquesExitososEquipo/${equipoId}`;
        return axios.get(url);
    }

    getAtaquesFallidosByIdEquipo(equipoId) {
        const url = `${EVENTO_API_BASE_URL}/ataquesFallidosEquipo/${equipoId}`;
        return axios.get(url);
    }

    getSaquesExitososByIdEquipo(equipoId) {
        const url = `${EVENTO_API_BASE_URL}/saquesExitososEquipo/${equipoId}`;
        return axios.get(url);
    }

    getSaquesFallidosByIdEquipo(equipoId) {
        const url = `${EVENTO_API_BASE_URL}/saquesFallidosEquipo/${equipoId}`;
        return axios.get(url);
    }

    getBloqueosExitososByIdEquipo(equipoId) {
        const url = `${EVENTO_API_BASE_URL}/bloqueosExitososEquipo/${equipoId}`;
        return axios.get(url);
    }


    /********************************************************************************************************************/

    getAdvertenciasByIdEquipo(equipoId) {
        const url = `${EVENTO_API_BASE_URL}/advertenciasEquipo/${equipoId}`;
        return axios.get(url);
    }

    getDescalificacionesByIdEquipo(equipoId) {
        const url = `${EVENTO_API_BASE_URL}/descalificacionesEquipo/${equipoId}`;
        return axios.get(url);
    }

    getPenalizacionesByIdEquipo(equipoId) {
        const url = `${EVENTO_API_BASE_URL}/penalizacionesEquipo/${equipoId}`;
        return axios.get(url);
    }

}

export default new EventoService();