import React, { useState, useEffect } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import JugadorService from '../services/JugadorService';
import ListaJugadoresPartidoService from '../services/ListaJugadoresPartidoService';
import JugadorPartidoService from '../services/JugadorPartidoService';
import PartidoService from "../services/PartidoService";

const AddJugadorPartidoEquipoForm = () => {
    const { id } = useParams();
    const [jugadorPartido, setJugadorPartido] = useState({
        numeroCamiseta: 0,
        capitan: false,
        jugador: null,
        listaJugadoresPartido: null,
    });

    const [jugadores, setJugadores] = useState([]);
    const [selectedPartidoId, setSelectedPartidoId] = useState('');
    const [partidos, setPartidos] = useState([]);
    const [jugadoresPartidos, setJugadoresPartidos] = useState([]);
    const [listasJugadoresPartido, setListasJugadoresPartido] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        ListaJugadoresPartidoService.getListasJugadoresPartido()
            .then((response) => {
                console.log(response.data);

                const promises = response.data.map((eventos) => {
                    if (eventos.equipo.idEquipo === parseInt(id) && eventos.partido !== null) {
                        return eventos;
                    }
                    return null;
                });
                return Promise.all(promises.filter(Boolean));
            })
            .then((partidos) => {
                setListasJugadoresPartido(partidos);
            })
            .catch((error) => {
                console.error('Error al obtener partidos:', error);
            });


        JugadorPartidoService.getJugadoresPartido()
            .then((response) => {
                if (!Array.isArray(response.data)) {
                    throw new Error('La respuesta no es un array');
                }

                const jugadoresUnicos = new Set();

                const promises = response.data.map((eventos) => {
                    if (
                        eventos.listaJugadoresPartido.equipo.idEquipo === parseInt(id) &&
                        !jugadoresUnicos.has(eventos.jugador.idJugador)
                    ) {
                        console.log(eventos.listaJugadoresPartido.equipo.idEquipo);
                        jugadoresUnicos.add(eventos.jugador.idJugador);
                        return eventos.jugador;
                    }
                    return null;
                });

                return Promise.all(promises.filter(Boolean));
            })
            .then((jugadores) => {
                setJugadores(jugadores);
                console.log(jugadores);
            })
            .catch((error) => {
                console.error('Error al obtener jugadores:', error);
            });
    }, []);

    const saveJugadorPartido = (e) => {
        e.preventDefault();

        JugadorPartidoService.createJugadorPartido(jugadorPartido)
            .then((response) => {
                console.log(response.data);
                if(response.data.listaJugadoresPartido.partido === null){
                    console.log("null");
                    setJugadorPartido()
                } else{
                    console.log("no null");
                }

                navigate(`/perfilEquipo/${id}`);
            })
            .catch((error) => {
                console.error('Error creating player match:', error);
                alert('Hubo un error al crear el jugador de partido. Por favor, inténtalo nuevamente.');
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJugadorPartido({ ...jugadorPartido, [name]: value });
    };

    const handleJugadorChange = (e) => {
        const jugadorId = e.target.value;
        console.log(jugadorId)
        const selectedJugador = jugadores.find((jugador) => jugador.idJugador === parseInt(jugadorId));
        setJugadorPartido({ ...jugadorPartido, jugador: selectedJugador });
        console.log(jugadorPartido)
    };

    const handleListaJugadoresPartidoChange = (e) => {
        setSelectedPartidoId(e.target.value)
        const listaJugadoresPartidoId = e.target.value;
        const selectedListaJugadoresPartido = listasJugadoresPartido.find(
            (lista) => lista.idListaJugadoresPartido === parseInt(listaJugadoresPartidoId)
        );
        setJugadorPartido({ ...jugadorPartido, listaJugadoresPartido: selectedListaJugadoresPartido });
    };

    return (
        <div style={{ background: "#202124", color: "#000", minHeight: "93vh" }}>
            <div className="container" style={{ padding: '20px' }}>
                &nbsp;
                <h2 className="text-center" style={{ color: '#ffffff' }}>
                    Crear Jugador de Partido
                </h2>
                &nbsp;
                <div className="row justify-content-center">
                    <div className="card col-md-8" style={{ background: '#bcbdbe', color: '#000' }}>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Número de Camiseta:</label>
                                    <input
                                        type="number"
                                        name="numeroCamiseta"
                                        value={jugadorPartido.numeroCamiseta}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Capitán:</label>
                                    <input
                                        type="checkbox"
                                        name="capitan"
                                        checked={jugadorPartido.capitan}
                                        onChange={() => setJugadorPartido({ ...jugadorPartido, capitan: !jugadorPartido.capitan })}
                                        className="form-check-input"
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Jugador:</label>
                                    <select
                                        name="jugador"
                                        value={jugadores ? jugadores.idJugador : ''}
                                        onChange={handleJugadorChange}
                                        className="form-control"
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    >
                                        <option value="">Seleccione un jugador</option>
                                        {jugadores.map((jugador) => (
                                            <option key={jugador.idJugador} value={jugador.idJugador}>
                                                {jugador.nombres}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Lista de Jugadores de Partido:</label>
                                    <select
                                        name="listaJugadoresPartido"
                                        value={jugadorPartido.listaJugadoresPartido ? jugadorPartido.listaJugadoresPartido.idListaJugadoresPartido : ''}
                                        onChange={handleListaJugadoresPartidoChange}
                                        className="form-control"
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    >
                                        <option value="">Seleccione una lista de jugadores de partido</option>
                                        {listasJugadoresPartido.map((lista) => (
                                            <option key={lista.idListaJugadoresPartido} value={lista.idListaJugadoresPartido}>
                                                {lista.partido.nombreCompeticion}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    onClick={saveJugadorPartido}
                                    className="btn btn-success"
                                    style={{ background: '#F4B205', color: '#000000' }}
                                >
                                    Guardar Jugador de Partido
                                </button>

                                <Link
                                    to={`/perfilEquipo/${id}`}
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

export default AddJugadorPartidoEquipoForm;
