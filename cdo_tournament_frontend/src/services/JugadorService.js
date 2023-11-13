import axios from 'axios';

const JUGADOR_API_BASE_URL = "http://localhost:8080/jugador";

class JugadorService {

    getJugadores(){
        const url = `${JUGADOR_API_BASE_URL}/jugadores`;
        return axios.get(url);
    }

    createJugador(jugador){
        return axios.post(JUGADOR_API_BASE_URL, jugador);
    }

    getJugadorById(jugadorId) {
        const url = `${JUGADOR_API_BASE_URL}/${jugadorId}`;
        return axios.get(url);
    }

    updateJugador(jugadorId, jugador) {
        const url = `${JUGADOR_API_BASE_URL}/${jugadorId}`;
        return axios.put(url, jugador);
    }

    deleteJugador(jugadorId) {
        const url = `${JUGADOR_API_BASE_URL}/${jugadorId}`;
        return axios.delete(url);
    }
}

export default new JugadorService();