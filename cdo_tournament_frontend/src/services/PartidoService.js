import axios from 'axios';

const PARTIDO_API_BASE_URL = "http://localhost:8080/partido";

class PartidoService {

    getPartidos() {
        const url = `${PARTIDO_API_BASE_URL}/partidos`;
        return axios.get(url);
    }

    createPartido(partido) {
        return axios.post(PARTIDO_API_BASE_URL, partido);
    }

    getPartidoById(partidoId) {
        const url = `${PARTIDO_API_BASE_URL}/${partidoId}`;
        return axios.get(url);
    }

    updatePartido(partidoId, partido) {
        const url = `${PARTIDO_API_BASE_URL}/${partidoId}`;
        return axios.put(url, partido);
    }

    deletePartido(partidoId) {
        const url = `${PARTIDO_API_BASE_URL}/${partidoId}`;
        return axios.delete(url);
    }
}

export default new PartidoService();