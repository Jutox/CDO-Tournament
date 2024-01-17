import React, { useEffect, useState } from 'react';
import AddEventoForm from './AddEventoForm';
import DatePicker from 'react-datepicker';
import { Link, useNavigate, useParams } from 'react-router-dom';
import JugadorPartidoService from '../services/JugadorPartidoService';
import SetPartidoService from '../services/SetPartidoService';
import EventoService from '../services/EventosService';
import ListaJugadoresPartidoService from '../services/ListaJugadoresPartidoService';
import {Table} from "react-bootstrap";

const TableroPuntos = () => {
    const { partidoId, setId } = useParams();
    const [puntajeEquipo1, setPuntajeEquipo1] = useState(0);
    const [puntajeEquipo2, setPuntajeEquipo2] = useState(0);
    const [equiposId, setEquiposId] = useState(0);
    const [listaJugadoresPartidoCasa, setListaJugadoresPartidoCasa] = useState([]);
    const [listaJugadoresPartidoVisita, setListaJugadoresPartidoVisita] = useState([]);
    const [jugadoresPartido, setJugadorPartido] = useState([]);
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

    //const [jugadoresPartido, setJugadoresPartido] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        /*JugadorPartidoService.getJugadoresPartido()
            .then((response) => {
                const promises = response.data.map((eventos) => {
                    if (eventos.listaJugadoresPartido.partido != null && eventos.listaJugadoresPartido.partido.idPartido === parseInt(partidoId)) {
                        return eventos;
                    }
                    return null;
                });
                return Promise.all(promises.filter((nombre) => nombre !== null));
            })
            .then((jugadoresPartidos) => {
                setJugadoresPartido(jugadoresPartidos);
            });*/


        JugadorPartidoService.getJugadoresPartido()
            .then((response) => {
                setJugadorPartido(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
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

        ListaJugadoresPartidoService.getListasJugadoresPartido()
            .then((response) => {
                // Map over the response data and create promises for the matches that meet the condition
                const promises = response.data.map((eventos) => {
                    if (eventos && eventos.partido && eventos.partido.idPartido != null && eventos.partido.idPartido == parseInt(partidoId)) {
                        return eventos.equipo.idEquipo; // Return the team name if the condition is met
                    }
                    return null; // Return null for events that don't match the condition
                });

                // Filter out the nulls and resolve all promises
                return Promise.all(promises.filter(nombre => nombre !== null));
            })
            .then(equiposIds => {
                // Update the state with all filtered team names
                setEquiposId(equiposIds);
            })
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
                <div className="card" style={{ background: '#ffffff', width: '600px', margin: '0 -300px' }}>
                    <div className="card-body">
                        <h3 className="text-center">{equipos[0]}</h3>
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
                <div className="card" style={{ background: '#ffffff', width: '600px', margin: '0 10px' }}>
                    <div className="card-body">
                        <h3 className="text-center">{equipos[1]}</h3>
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

    useEffect(() => {
        const filteredJugadores = jugadoresPartido.map((eventos) => {
            console.log("holaaa"); // Preserve the console.log statement
            if (
                eventos &&
                eventos.listaJugadoresPartido &&
                eventos.listaJugadoresPartido.partido !== null &&
                eventos.listaJugadoresPartido.equipo &&
                eventos.listaJugadoresPartido.equipo.idEquipo == parseInt(equiposId[0]) &&
                eventos.listaJugadoresPartido.partido.idPartido == parseInt(partidoId)
            ) {
                return eventos;
            }
            return null; // Return null for items that don't meet the conditions
        }).filter((eventos) => eventos !== null); // Filter out null values

        console.log(filteredJugadores);
        setListaJugadoresPartidoCasa(filteredJugadores);
        console.log(listaJugadoresPartidoCasa);
    }, [jugadoresPartido, equiposId, partidoId]);

    useEffect(() => {
        const filteredJugadores = jugadoresPartido.map((eventos) => {
            console.log("holaa"); // Preserve the console.log statement
            if (
                eventos &&
                eventos.listaJugadoresPartido &&
                eventos.listaJugadoresPartido.partido !== null &&
                eventos.listaJugadoresPartido.equipo &&
                eventos.listaJugadoresPartido.equipo.idEquipo == parseInt(equiposId[1]) &&
                eventos.listaJugadoresPartido.partido.idPartido == parseInt(partidoId)
            ) {
                return eventos;
            }
            return null; // Return null for items that don't meet the conditions
        }).filter((eventos) => eventos !== null); // Filter out null values

        console.log(filteredJugadores);
        setListaJugadoresPartidoVisita(filteredJugadores);
        console.log(listaJugadoresPartidoCasa);
    }, [jugadoresPartido, equiposId, partidoId]);

    return (
        <div style={{ background: '#202124', color: '#000', minHeight: '93vh', justifyContent: 'center', alignItems: 'center',  paddingTop: '80px' }}>
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
                        <div style={{ background: '#202124', color: '#000', minHeight: '93vh', padding: '0px' }}>
                            <div className="container" style={{ padding: '0px' }}>
                                <div className="row justify-content-center">
                                        <div className="card-body">
                                            <form>
                                                <div className="row justify-content-center">
                                                    <div className="card col-md-8 " style={{ background: '#bcbdbe', color: '#000' }}>
                                                <div className="container" style={{ padding: '5px' }}>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div style={{ margin: '5px' }}>
                                                                <div className="row justify-content-center">
                                                                    <h4>Equipo Casa</h4>
                                                                    {listaJugadoresPartidoCasa.map((jugadorPartido) => (
                                                                        <div key={jugadorPartido.idJugadorPartido} className="form-check">
                                                                            <input
                                                                                type="radio"
                                                                                className="form-check-input"
                                                                                id={`jugadorCasa-${jugadorPartido.idJugadorPartido}`}
                                                                                name="selectedPlayer"
                                                                                value={jugadorPartido.idJugadorPartido}
                                                                                onChange={handleJugadorPartidoChange}
                                                                            />
                                                                            <label className="form-check-label" htmlFor={`jugadorCasa-${jugadorPartido.idJugadorPartido}`} style={{ direction: 'rtl', textAlign: 'right' }}>
                                                                                {jugadorPartido.jugador.nombres + " - Nro." + jugadorPartido.numeroCamiseta}
                                                                            </label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div style={{ margin: '5px' }}>
                                                                <div className="row justify-content-center">
                                                                    <h4>Equipo Visita</h4>
                                                                    {listaJugadoresPartidoVisita.map((jugadorPartido) => (
                                                                        <div key={jugadorPartido.idJugadorPartido} className="form-check">
                                                                            <input
                                                                                type="radio"
                                                                                className="form-check-input"
                                                                                id={`jugadorVisita-${jugadorPartido.idJugadorPartido}`}
                                                                                name="selectedPlayer"
                                                                                value={jugadorPartido.idJugadorPartido}
                                                                                onChange={handleJugadorPartidoChange}
                                                                            />
                                                                            <label className="form-check-label" htmlFor={`jugadorVisita-${jugadorPartido.idJugadorPartido}`}>
                                                                                {jugadorPartido.jugador.nombres+" - Nro."+ jugadorPartido.numeroCamiseta}
                                                                            </label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                        <div className="card-body ">
                                                            <div className="form-group mb-2 ">
                                                                <label style={{ color: '#000'}}>Tipo de Evento:</label>
                                                                <div></div>
                                                                &nbsp;
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                    <div className="form-check">
                                                                        <input
                                                                            type="radio"
                                                                            className="form-check-input"
                                                                            id="saqueExitoso"
                                                                            name="tipo"
                                                                            value="SAQUE_EXITOSO"
                                                                            checked={evento.tipo === "SAQUE_EXITOSO"}
                                                                            onChange={handleTipoChange}
                                                                        />
                                                                        <label className="form-check-label" htmlFor="saqueExitoso">
                                                                            Saque Exitoso
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input
                                                                            type="radio"
                                                                            className="form-check-input"
                                                                            id="saqueFallido"
                                                                            name="tipo"
                                                                            value="SAQUE_FALLIDO"
                                                                            checked={evento.tipo === "SAQUE_FALLIDO"}
                                                                            onChange={handleTipoChange}
                                                                        />
                                                                        <label className="form-check-label" htmlFor="saqueFallido">
                                                                            Saque Fallido
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input
                                                                            type="radio"
                                                                            className="form-check-input"
                                                                            id="ataqueExitoso"
                                                                            name="tipo"
                                                                            value="ATAQUE_EXITOSO"
                                                                            checked={evento.tipo === "ATAQUE_EXITOSO"}
                                                                            onChange={handleTipoChange}
                                                                        />
                                                                        <label className="form-check-label" htmlFor="ataqueExitoso">
                                                                            Ataque Exitoso
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input
                                                                            type="radio"
                                                                            className="form-check-input"
                                                                            id="ataqueFallido"
                                                                            name="tipo"
                                                                            value="ATAQUE_FALLIDO"
                                                                            checked={evento.tipo === "ATAQUE_FALLIDO"}
                                                                            onChange={handleTipoChange}
                                                                        />
                                                                        <label className="form-check-label" htmlFor="ataqueFallido">
                                                                            Ataque Fallido
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                    <div className="col-md-6">
                                                                    <div className="form-check">
                                                                        <input
                                                                            type="radio"
                                                                            className="form-check-input"
                                                                            id="bloqueoExitoso"
                                                                            name="tipo"
                                                                            value="BLOQUEO_EXITOSO"
                                                                            checked={evento.tipo === "BLOQUEO_EXITOSO"}
                                                                            onChange={handleTipoChange}
                                                                        />
                                                                        <label className="form-check-label" htmlFor="bloqueoExitoso">
                                                                            Bloqueo Exitoso
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input
                                                                            type="radio"
                                                                            className="form-check-input"
                                                                            id="advertencia"
                                                                            name="tipo"
                                                                            value="ADVERTENCIA"
                                                                            checked={evento.tipo === "ADVERTENCIA"}
                                                                            onChange={handleTipoChange}
                                                                        />
                                                                        <label className="form-check-label" htmlFor="advertencia">
                                                                            Advertencia
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input
                                                                            type="radio"
                                                                            className="form-check-input"
                                                                            id="penalizacion"
                                                                            name="tipo"
                                                                            value="PENALIZACION"
                                                                            checked={evento.tipo === "PENALIZACION"}
                                                                            onChange={handleTipoChange}
                                                                        />
                                                                        <label className="form-check-label" htmlFor="penalizacion">
                                                                            Penalización
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input
                                                                            type="radio"
                                                                            className="form-check-input"
                                                                            id="descalificacion"
                                                                            name="tipo"
                                                                            value="DESCALIFICACION"
                                                                            checked={evento.tipo === "DESCALIFICACION"}
                                                                            onChange={handleTipoChange}
                                                                        />
                                                                        <label className="form-check-label" htmlFor="descalificacion">
                                                                            Descalificación
                                                                        </label>
                                                                    </div>
                                                                    </div>
                                                            </div>
                                                                <div></div>
                                                                &nbsp;
                                                            {/* Campo para orden de servicio */}
                                                                <div className="row">
                                                                    <div className="col-md-6">
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
                                                                    </div>
                                                                    <div className="col-md-6">                                                            {/* Campo para ronda de servicio */}
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
                                                                    </div>
                                                                </div>
                                                            <button
                                                                className="btn btn-success"
                                                                onClick={saveEvento}
                                                                style={{ background: '#F4B205', color: '#fff' }}
                                                            >
                                                                Guardar
                                                            </button>
                                                                <Link
                                                                    to={`/perfilSetPartido/${partidoId}/${setId}`}
                                                                    className="btn btn-danger"
                                                                    style={{
                                                                        background: '#dc3545',
                                                                        color: '#fff',
                                                                        float: 'right',  // Align the button to the left
                                                                    }}
                                                                >
                                                                    Cancelar
                                                                </Link>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </form>
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
