import axios from 'axios';

const JUGADORPARTIDO_API_BASE_URL = "http://localhost:8080/jugadorPartido";

class JugadorPartidoService {

    getJugadoresPartido() {
        const url = `${JUGADORPARTIDO_API_BASE_URL}/jugadoresPartidos`;
        return axios.get(url);
    }

    createJugadorPartido(jugadorPartidoDTO) {
        return axios.post(JUGADORPARTIDO_API_BASE_URL, jugadorPartidoDTO);
    }

    getJugadorPartidoById(jugadorPartidoId) {
        const url = `${JUGADORPARTIDO_API_BASE_URL}/${jugadorPartidoId}`;
        return axios.get(url);
    }

    updateJugadorPartido(jugadorPartidoId, jugadorPartidoDTO) {
        const url = `${JUGADORPARTIDO_API_BASE_URL}/${jugadorPartidoId}`;
        return axios.put(url, jugadorPartidoDTO);
    }

    deleteJugadorPartido(jugadorPartidoId) {
        const url = `${JUGADORPARTIDO_API_BASE_URL}/${jugadorPartidoId}`;
        return axios.delete(url);
    }
}

export default new JugadorPartidoService();