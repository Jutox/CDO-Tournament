import React, { useEffect, useState } from 'react';
import AddEventoForm from './AddEventoForm';
import DatePicker from 'react-datepicker';
import { Link, useNavigate, useParams } from 'react-router-dom';
import JugadorPartidoService from '../services/JugadorPartidoService';
import SetPartidoService from '../services/SetPartidoService';
import EventoService from '../services/EventosService';
import ListaJugadoresPartidoService from '../services/ListaJugadoresPartidoService';

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

    const [setPartido, setSetPartido] = useState({
        numeroSet: 0,
        horaInicio: null,
        horaTermino: null,
        puntajeA: 0,
        puntajeB: 0,
        partido: '',
    });

    let puntovar = 0;
    let puntovarA = 0;
    let puntovarB = 0;

    const [equipos, setEquipos] = useState(0);
    const currentTime = new Date();

    const [jugadoresPartido, setJugadoresPartido] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        JugadorPartidoService.getJugadoresPartido()
            .then((response) => {
                setJugadoresPartido(response.data);
            })
            .catch((error) => {
                console.error('Error fetching player matches:', error);
            });

        SetPartidoService.getSetPartidoById(setId)
            .then((response) => {
                setSetPartido(response.data);
                console.log(response.data);
                setEvento({ ...evento, set: response.data, hora: currentTime });
            })
            .catch((error) => {
                console.error('Error fetching match sets:', error);
            });

        ListaJugadoresPartidoService.getListasJugadoresPartido()
            .then((response) => {
                const promises = response.data.map((eventos) => {
                    if (eventos && eventos.partido && eventos.partido.idPartido != null && eventos.partido.idPartido == parseInt(partidoId)) {
                        return eventos.equipo.nombreEquipo;
                    }
                    return null;
                });
                return Promise.all(promises.filter((nombre) => nombre !== null));
            })
            .then((equiposNombres) => {
                setEquipos(equiposNombres);
            });
    }, []);

    useEffect(() => {
        setPuntajeEquipo1(setPartido.puntajeA);
        setPuntajeEquipo2(setPartido.puntajeB);
        tableroA()
        tableroB()
    }, [setPartido]);

    const saveEvento = async (e) => {
        e.preventDefault();
        let puntovar = evento.puntos;
        let puntovarA = setPartido.puntajeA;
        let puntovarB = setPartido.puntajeB;

        if (evento.jugadorPartido.listaJugadoresPartido.equipo.nombreEquipo === equipos[1]) {
            puntovar = evento.puntos * -1;
        }

        setEvento({ ...evento, puntos: puntovar });

        if (puntovar > 0) {
            puntovarA=setPartido.puntajeA+puntovar;
        }else if (puntovar < 0){
            puntovarB=setPartido.puntajeB-puntovar;
        }

        try {
            await SetPartidoService.updateSetPartido(setId, { ...setPartido, puntajeA: puntovarA, puntajeB: puntovarB });
            await EventoService.createEvento({ ...evento, puntos: puntovar, set: setPartido });
            console.log(evento);
            setEvento({
                hora: '',
                tipo: '',
                puntos: 0,
                ordenServicio: 0,
                rondaServicio: 0,
                jugadorPartido: null,
                set: null,
            });
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert('Error al capturar datos. Por favor, inténtalo nuevamente.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvento({ ...evento, [name]: value });
    };

    const handleTipoChange = (e) => {
        const selectedTipo = e.target.value;
        console.log(selectedTipo);
        let puntoVar = 0;
        switch (selectedTipo) {
            case 'SAQUE_EXITOSO':
                puntoVar = 1;
                break;
            case 'SAQUE_FALLIDO':
                puntoVar = -1;
                break;
            case 'ATAQUE_EXITOSO':
                puntoVar = 1;
                break;
            case 'ATAQUE_FALLIDO':
                puntoVar = -1;
                break;
            case 'BLOQUEO_EXITOSO':
                puntoVar = 1;
                break;
            case 'ADVERTENCIA':
                puntoVar = 0;
                break;
            case 'PENALIZACION':
                puntoVar = -1;
                break;
            case 'DESCALIFICACION':
                puntoVar = -2;
                break;
        }
        setEvento({ ...evento, tipo: selectedTipo, puntos: puntoVar });
    };

    const tableroA = () => {
        return (
            <div className="col-md-3">
                <div className="card" style={{ background: '#bcbdbe', width: '600px', margin: '0 -300px' }}>
                    <div className="card-body">
                        <h3 className="text-center">Equipo 1</h3>
                        <div className="text-center" style={{ fontSize: '348px' }}>
                            {puntajeEquipo1}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const tableroB = () => {
        return (
            <div className="col-md-3">
                <div className="card" style={{ background: '#bcbdbe', width: '600px', margin: '0 10px' }}>
                    <div className="card-body">
                        <h3 className="text-center">Equipo 2</h3>
                        <div className="text-center" style={{ fontSize: '348px' }}>
                            {puntajeEquipo2}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const handleJugadorPartidoChange = (e) => {
        const jugadorPartidoId = e.target.value;
        const selectedJugadorPartido = jugadoresPartido.find((jugadorPartido) => jugadorPartido.idJugadorPartido === parseInt(jugadorPartidoId));
        setEvento({ ...evento, jugadorPartido: selectedJugadorPartido });
        console.log(evento.tipo + ' ' + evento.puntos);
    };

    return (
        <div style={{ background: '#202124', color: '#000', minHeight: '93vh', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container">
                &nbsp;
                <h2 className="text-center" style={{ color: '#ffffff' }}>
                    {' '}
                    Tablero de Puntos
                </h2>
                &nbsp;
                <div className="row justify-content-center">
                    {tableroA()}

                    <div className="col-md-6">
                        <div style={{ background: '#202124', color: '#000', minHeight: '93vh', padding: '20px' }}>
                            <div className="container" style={{ padding: '20px' }}>
                                &nbsp;
                                <h2 className="text-center" style={{ color: '#ffffff' }}>
                                    Agregar Evento
                                </h2>
                                &nbsp;
                                <div className="row justify-content-center">
                                    <div className="card col-md-8" style={{ background: '#bcbdbe', color: '#000' }}>
                                        <div className="card-body">
                                            <form>
                                                {/* Dropdown para el tipo de evento */}
                                                <div className="form-group mb-2">
                                                    <label style={{ color: '#000' }}>Tipo de Evento:</label>
                                                    <select
                                                        className="form-control"
                                                        name="tipo"
                                                        value={evento.tipo}
                                                        onChange={handleTipoChange}
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
                                                                {jugadorPartido.numeroCamiseta + ' - ' + jugadorPartido.listaJugadoresPartido.equipo.nombreEquipo + ' - ' + jugadorPartido.jugador.nombres}
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

                    {tableroB()}
                </div>
            </div>
        </div>
    );
};

export default TableroPuntos;
