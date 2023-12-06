import axios from 'axios';

const SETPARTIDO_API_BASE_URL = "http://localhost:8080/setPartido";

class SetPartidoService {

    getSetsPartido() {
        const url = `${SETPARTIDO_API_BASE_URL}/sets`;
        return axios.get(url);
    }

    createSetPartido(setPartido) {
        return axios.post(SETPARTIDO_API_BASE_URL, setPartido);
    }

    getSetPartidoById(setPartidoId) {
        const url = `${SETPARTIDO_API_BASE_URL}/${setPartidoId}`;
        return axios.get(url);
    }

    updateSetPartido(setPartidoId, setPartido) {
        const url = `${SETPARTIDO_API_BASE_URL}/${setPartidoId}`;
        return axios.put(url, setPartido);
    }

    deleteSetPartido(setPartidoId) {
        const url = `${SETPARTIDO_API_BASE_URL}/${setPartidoId}`;
        return axios.delete(url);
    }

    getSetsByIdPartido(partidoId) {
        const url = `${SETPARTIDO_API_BASE_URL}/setsPartido/${partidoId}`;
        return axios.get(url);
    }
}

export default new SetPartidoService();