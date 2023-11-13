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

    updateEvento(eventoId, evento) {
        const url = `${EVENTO_API_BASE_URL}/${eventoId}`;
        return axios.put(url, evento);
    }

    deleteEvento(eventoId) {
        const url = `${EVENTO_API_BASE_URL}/${eventoId}`;
        return axios.delete(url);
    }
}

export default new EventoService();