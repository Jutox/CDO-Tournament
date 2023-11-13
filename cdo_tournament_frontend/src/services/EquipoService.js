import axios from 'axios';

const EQUIPO_API_BASE_URL = "http://localhost:8080/equipo";

class EquipoService {

    getEquipos() {
        const url = `${EQUIPO_API_BASE_URL}/equipos`;
        return axios.get(url);
    }

    createEquipo(equipo) {
        return axios.post(EQUIPO_API_BASE_URL, equipo);
    }

    getEquipoById(equipoId) {
        const url = `${EQUIPO_API_BASE_URL}/${equipoId}`;
        return axios.get(url);
    }

    updateEquipo(equipoId, equipo) {
        const url = `${EQUIPO_API_BASE_URL}/${equipoId}`;
        return axios.put(url, equipo);
    }

    deleteEquipo(equipoId) {
        const url = `${EQUIPO_API_BASE_URL}/${equipoId}`;
        return axios.delete(url);
    }
}

export default new EquipoService();