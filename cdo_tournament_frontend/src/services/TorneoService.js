import axios from 'axios';

const TORNEO_API_BASE_URL = "http://localhost:8080/torneo";

class TorneoService {

    getTorneos() {
        const url = `${TORNEO_API_BASE_URL}/torneos`;
        return axios.get(url);
    }

    createTorneo(torneo) {
        return axios.post(TORNEO_API_BASE_URL, torneo);
    }

    getTorneoById(torneoId) {
        const url = `${TORNEO_API_BASE_URL}/${torneoId}`;
        return axios.get(url);
    }

    updateTorneo(torneoId, torneo) {
        const url = `${TORNEO_API_BASE_URL}/${torneoId}`;
        return axios.put(url, torneo);
    }

    deleteTorneo(torneoId) {
        const url = `${TORNEO_API_BASE_URL}/${torneoId}`;
        return axios.delete(url);
    }
}

export default new TorneoService();