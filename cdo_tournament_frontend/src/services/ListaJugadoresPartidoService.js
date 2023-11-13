import axios from 'axios';

const LISTAJUGADORESPARTIDO_API_BASE_URL = "http://localhost:8080/listaJugadoresPartido";

class ListaJugadoresPartidoService {

    getListasJugadoresPartido() {
        const url = `${LISTAJUGADORESPARTIDO_API_BASE_URL}/listas`;
        return axios.get(url);
    }

    createListaJugadoresPartido(listaJugadoresPartido) {
        return axios.post(LISTAJUGADORESPARTIDO_API_BASE_URL, listaJugadoresPartido);
    }

    getListaJugadoresPartidoById(listaJugadoresPartidoId) {
        const url = `${LISTAJUGADORESPARTIDO_API_BASE_URL}/${listaJugadoresPartidoId}`;
        return axios.get(url);
    }

    updateListaJugadoresPartido(listaJugadoresPartidoId, listaJugadoresPartido) {
        const url = `${LISTAJUGADORESPARTIDO_API_BASE_URL}/${listaJugadoresPartidoId}`;
        return axios.put(url, listaJugadoresPartido);
    }

    deleteListaJugadoresPartido(listaJugadoresPartidoId) {
        const url = `${LISTAJUGADORESPARTIDO_API_BASE_URL}/${listaJugadoresPartidoId}`;
        return axios.delete(url);
    }
}

export default new ListaJugadoresPartidoService();