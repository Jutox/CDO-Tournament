import React, {useEffect, useState} from 'react';
import AddEventoForm from './AddEventoForm';
import DatePicker from "react-datepicker";
import {Link, useNavigate, useParams} from "react-router-dom";
import JugadorPartidoService from "../services/JugadorPartidoService";
import SetPartidoService from "../services/SetPartidoService";
import EventoService from "../services/EventosService"; // Asegúrate de que la ruta sea la correcta

const TableroPuntos = () => {
    const { partidoId, setId } = useParams();
    const [puntajeEquipo1, setPuntajeEquipo1] = useState(0);
    const [puntajeEquipo2, setPuntajeEquipo2] = useState(0);
    const [evento, setEvento] = useState({
        hora: '',
        tipo: '',
        puntos: 0,
        ordenServicio: 0,
        rondaServicio: 0,
        jugadorPartido: null,
        set: null,
    });

    const [jugadoresPartido, setJugadoresPartido] = useState([]);
    const [setsPartido, setSetsPartido] = useState([]);

    const navigate = useNavigate();

    const aumentarPuntajeEquipo1 = () => {
        setPuntajeEquipo1(puntajeEquipo1 + 1);
    };

    const disminuirPuntajeEquipo1 = () => {
        if (puntajeEquipo1 > 0) {
            setPuntajeEquipo1(puntajeEquipo1 - 1);
        }
    };

    const aumentarPuntajeEquipo2 = () => {
        setPuntajeEquipo2(puntajeEquipo2 + 1);
    };

    const disminuirPuntajeEquipo2 = () => {
        if (puntajeEquipo2 > 0) {
            setPuntajeEquipo2(puntajeEquipo2 - 1);
        }
    };

    useEffect(() => {
        JugadorPartidoService.getJugadoresPartido()
            .then((response) => {
                setJugadoresPartido(response.data);
            })
            .catch((error) => {
                console.error('Error fetching player matches:', error);
            });

        SetPartidoService.getSetsPartido()
            .then((response) => {
                setSetsPartido(response.data);
            })
            .catch((error) => {
                console.error('Error fetching match sets:', error);
            });
    }, []);

    const saveEvento = (e) => {
        e.preventDefault();

        EventoService.createEvento(evento)
            .then((response) => {
                console.log(evento);
                console.log(response.data);
                navigate("/eventos");
            })
            .catch((error) => {
                console.log(error);
                alert('Error al capturar datos. Por favor, inténtalo nuevamente.');
            });
    };

    const handleHourChange = (date, field) => {
        // Verificar si la fecha es válida
        if (!(date instanceof Date) || isNaN(date) || !isFinite(date)) {
            console.error("Fecha no válida");
            return;
        }

        // Verificar si la hora es válida
        if (isNaN(date.getHours()) || isNaN(date.getMinutes()) || isNaN(date.getSeconds())) {
            console.error("Hora no válida");
            return;
        }

        // Conservar la fecha y hora en el estado
        setEvento({ ...evento, [field]: date });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvento({ ...evento, [name]: value });
    };

    const handleJugadorPartidoChange = (e) => {
        const jugadorPartidoId = e.target.value;
        const selectedJugadorPartido = jugadoresPartido.find((jugadorPartido) => jugadorPartido.idJugadorPartido === parseInt(jugadorPartidoId));
        setEvento({ ...evento, jugadorPartido: selectedJugadorPartido });
        console.log(evento);
    };

    const handleSetPartidoChange = (e) => {
        const setId = e.target.value;
        const selectedSet = setsPartido.find((set) => set.idSetPartido === parseInt(setId));
        setEvento({ ...evento, set: selectedSet });
    };

    return (
        <div style={{  background: "#202124", color: "#000", minHeight: "93vh", justifyContent: "center", alignItems: "center" }}>
            <div className="container">
                &nbsp;
                <h2 className="text-center" style={{ color: '#ffffff' }}> Tablero de Puntos</h2>
                &nbsp;
                <div className="row justify-content-center">
                    <div className="col-md-3">
                        <div className="card" style={{ background: "#bcbdbe", width: "600px", margin: "0 -300px" }}>
                            <div className="card-body">
                                <h3 className="text-center">Equipo 1</h3>
                                <div className="text-center" style={{ fontSize: "348px" }}>{puntajeEquipo1}</div>
                                <div className="text-center">
                                    <button
                                        className="btn btn-primary m-2"
                                        onClick={aumentarPuntajeEquipo1}
                                    >
                                        Aumentar Punto
                                    </button>
                                    <button
                                        className="btn btn-warning m-2"
                                        onClick={disminuirPuntajeEquipo1}
                                    >
                                        Disminuir Punto
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card" style={{ background: "#bcbdbe", border: "none"  }}>
                            <div >
                                <div style={{ background: '#d4d1d0', color: '#000' }}>
                                    <div className="container" style={{ padding: '20px' }}>
                                        <h2 className="text-center" style={{ color: '#000' }}>
                                            Agregar Evento
                                        </h2>
                                        <div className="row justify-content-center">
                                            <div className="card col-md-8" style={{ background: '#bcbdbe', color: '#000' }}>
                                                <div className="card-body">
                                                    <form>
                                                        <div className="form-group mb-2">
                                                            <label style={{ color: '#000' }}>Hora del Partido:</label>
                                                            <DatePicker
                                                                className="form-control"
                                                                selected={evento.hora}
                                                                onChange={(date) => handleHourChange(date, 'hora')}
                                                                showTimeSelect
                                                                showTimeSelectOnly
                                                                timeIntervals={15}
                                                                timeCaption="Hora"
                                                                dateFormat="h:mm aa"
                                                                placeholderText="Selecciona hora"
                                                                style={{ background: '#e6e5e5', color: '#151414' }}
                                                            />
                                                        </div>
                                                        {/* Dropdown para el tipo de evento */}
                                                        <div className="form-group mb-2">
                                                            <label style={{ color: '#000' }}>Tipo de Evento:</label>
                                                            <select
                                                                className="form-control"
                                                                name="tipo"
                                                                value={evento.tipo}
                                                                onChange={handleInputChange}
                                                                style={{ background: '#e6e5e5', color: '#151414' }}
                                                            >
                                                                <option value="">Seleccione un tipo</option>
                                                                <option value="SAQUE_EXITOSO">Saque Exitoso</option>
                                                                <option value="SAQUE_FALLIDO">Saque Fallido</option>
                                                                <option value="ATAQUE_EXITOSO">Ataque Exitoso</option>
                                                                <option value="ATAQUE_FALLIDO">Ataque Fallido</option>
                                                                <option value="BLOQUEO_EXITOSO">Bloqueo Exitoso</option>
                                                                <option value="ADVERTENCIA">Advertencia</option>
                                                                <option value="PENALIZACION">Penalización</option>
                                                                <option value="DESCALIFICACION">Descalificación</option>
                                                            </select>
                                                        </div>
                                                        {/* Campo para puntos */}
                                                        <div className="form-group mb-2">
                                                            <label style={{ color: '#000' }}>Puntos:</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name="puntos"
                                                                value={evento.puntos}
                                                                onChange={handleInputChange}
                                                                style={{ background: '#e6e5e5', color: '#151414' }}
                                                            />
                                                        </div>
                                                        {/* Campo para orden de servicio */}
                                                        <div className="form-group mb-2">
                                                            <label style={{ color: '#000' }}>Orden de Servicio:</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name="ordenServicio"
                                                                value={evento.ordenServicio}
                                                                onChange={handleInputChange}
                                                                style={{ background: '#e6e5e5', color: '#151414' }}
                                                            />
                                                        </div>
                                                        {/* Campo para ronda de servicio */}
                                                        <div className="form-group mb-2">
                                                            <label style={{ color: '#000' }}>Ronda de Servicio:</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name="rondaServicio"
                                                                value={evento.rondaServicio}
                                                                onChange={handleInputChange}
                                                                style={{ background: '#e6e5e5', color: '#151414' }}
                                                            />
                                                        </div>
                                                        <div className="form-group mb-2">
                                                            <label style={{ color: '#000' }}>Jugador Partido:</label>
                                                            <select
                                                                className="form-control"
                                                                value={evento.jugadorPartido ? evento.jugadorPartido.idJugadorPartido : ''}
                                                                onChange={handleJugadorPartidoChange}
                                                                style={{ background: '#e6e5e5', color: '#151414' }}
                                                            >
                                                                <option value="">Seleccione un jugador</option>
                                                                {jugadoresPartido.map((jugadorPartido) => (
                                                                    <option key={jugadorPartido.idJugadorPartido} value={jugadorPartido.idJugadorPartido}>
                                                                        {jugadorPartido.jugador.nombres}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="form-group mb-2">
                                                            <label style={{ color: '#000' }}>Set Partido:</label>
                                                            <select
                                                                className="form-control"
                                                                value={evento.set ? evento.set.idSetPartido : ''}
                                                                onChange={handleSetPartidoChange}
                                                                style={{ background: '#e6e5e5', color: '#151414' }}
                                                            >
                                                                <option value="">Seleccione un set</option>
                                                                {setsPartido.map((set) => (
                                                                    <option key={set.idSetPartido} value={set.idSetPartido}>
                                                                        {set.idSetPartido}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <button
                                                            className="btn btn-success"
                                                            onClick={saveEvento}
                                                            style={{ background: '#F4B205', color: '#fff' }}
                                                        >
                                                            Guardar
                                                        </button>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <Link
                                                            to={`/perfilSetPartido/${partidoId}/${setId}`}
                                                            className="btn btn-danger"
                                                            style={{ background: '#dc3545', color: '#fff' }}
                                                        >
                                                            Cancelar
                                                        </Link>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card" style={{ background: "#bcbdbe", width: "600px", margin: "0 10px" }}>
                            <div className="card-body">
                                <h3 className="text-center">Equipo 2</h3>
                                <div className="text-center" style={{ fontSize: "348px" }}>{puntajeEquipo2}</div>
                                <div className="text-center">
                                    <button
                                        className="btn btn-primary m-2"
                                        onClick={aumentarPuntajeEquipo2}
                                    >
                                        Aumentar Punto
                                    </button>
                                    <button
                                        className="btn btn-warning m-2"
                                        onClick={disminuirPuntajeEquipo2}
                                    >
                                        Disminuir Punto
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableroPuntos;
