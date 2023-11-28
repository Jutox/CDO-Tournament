import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EventoService from '../services/EventosService'; // Asegúrate de importar el servicio adecuado para Evento
import SetPartidoService from '../services/SetPartidoService';
import JugadorPartidoService from '../services/JugadorPartidoService';
import DatePicker from "react-datepicker";

const AddEventoForm = () => {
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
        <div style={{ background: '#d4d1d0', color: '#000', minHeight: '93vh' }}>
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
                                    to="/eventos"
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
    );
};

export default AddEventoForm;
