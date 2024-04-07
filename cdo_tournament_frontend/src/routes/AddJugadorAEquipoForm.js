import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TorneoService from '../services/TorneoService';
import PartidoService from '../services/PartidoService';
import JugadorPartidoService from '../services/JugadorPartidoService';
import EquipoService from "../services/EquipoService";
import ListaJugadoresPartidoService from '../services/ListaJugadoresPartidoService';
import JugadorService from "../services/JugadorService";
const AddJugadorAEquipoForm = () => {
    const { idEquipo } = useParams();
    const [equipo, setEquipo] = useState({
        nombreEquipo: '',
        nombreEntrenador: '',
    });

    const [listaJugadorPartido, setListaJugadorPartido] = useState({
        equipo: null,
        partido: null,
    });

    useEffect(() => {
        // Make sure to handle any asynchronous code inside an async function
        const fetchData = async () => {
            try {
                const response = await EquipoService.getEquipoById(idEquipo);
                // Update the equipo state with the fetched data
                setEquipo(response.data);

                // Update the listaJugadorPartido state by spreading the existing state
                // and updating the equipo property with the fetched data
                setListaJugadorPartido((prevLista) => ({
                    ...prevLista,
                    equipo: response.data,
                }));
                console.log(listaJugadorPartido);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching team:', error);
            }
        };

        // Call the fetchData function when idEquipo changes
        fetchData();
    }, [idEquipo]);

    const [jugadorPartido, setJugadorPartido] = useState({
        numeroCamiseta: null,
        capitan: false,
        jugador: null,
        listaJugadoresPartido: null,
    });

    const [jugadores, setJugadores] = useState([]);
    const [partidos, setPartidos] = useState([]);
    const jugadoresPartido = new Set();
    const [listaJugadoresPartido, setListaJugadoresPartido] = useState([]);
    const [partidoLista, setPartidoLista] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        JugadorPartidoService.getJugadoresPartido()
            .then((response) => {
                const promises = response.data.map((eventos) => {
                    jugadoresPartido.add(eventos.jugador.idJugador);
                });
            })
            .catch((error) => {
                console.error('Error fetching player matches:', error);
            });

        JugadorService.getJugadores()
            .then((response) => {
                if (!Array.isArray(response.data)) {
                    throw new Error('La respuesta no es un array');
                }
                const promises = response.data.map((eventos) => {
                    if (!jugadoresPartido.has(eventos.idJugador)) {
                        return eventos;
                    }
                    return null;
                });

                return Promise.all(promises.filter(Boolean));
            })
            .then((jugadores) => {
                setJugadores(jugadores);
            })
            .catch((error) => {
                console.error('Error al obtener jugadores:', error);
            });

        /*
        ListaJugadoresPartidoService.getListasJugadoresPartido()
            .then((response) => {
                if (!Array.isArray(response.data)) {
                    throw new Error('La respuesta no es un array');
                }

                const promises = response.data.map((eventos) => {
                    if (eventos.equipo.idEquipo === parseInt(idEquipo)) {
                        return eventos;
                    }
                    return null;
                });

                return Promise.all(promises.filter(Boolean));
            })
            .then((listasJugadoresPartidos) => {
                setListaJugadoresPartido(listasJugadoresPartidos);
            })
            .catch((error) => {
                console.error('Error al obtener jugadores:', error);
            });*/
    }, []);

    const handleJugadorChange = (e) => {
        const jugadorId = e.target.value;
        console.log(jugadorId)
        console.log(equipo)
        const selectedJugador = jugadores.find((jugador) => jugador.idJugador === parseInt(jugadorId));
        setJugadorPartido({ ...jugadorPartido, jugador: selectedJugador });
    };


    const saveJugadorEnEquipo = (e) => {
        e.preventDefault();

        // Assuming that listaJugadorPartido is correctly initialized or provided

        // Step 1: Save the ListaJugadoresPartido entity
        ListaJugadoresPartidoService.createListaJugadoresPartido(listaJugadorPartido)
            .then((response) => {
                // Ensure that response.data contains a valid ListaJugadoresPartido reference
                const listaJugadoresPartidoReference = response.data;

                if (!listaJugadoresPartidoReference) {
                    throw new Error('Invalid ListaJugadoresPartido reference in the response.');
                }

                // Step 2: Create the JugadorPartido entity with references
                const updatedJugadorPartido = {
                    ...jugadorPartido,
                    listaJugadoresPartido: listaJugadoresPartidoReference,
                };

                // Step 3: Save the JugadorPartido entity
                return JugadorPartidoService.createJugadorPartido(updatedJugadorPartido);
            })
            .then((responseJugadorPartido) => {
                // Handle successful save
                navigate(`/perfilEquipo/${idEquipo}`); // Adjust the route according to your app
            })
            .catch((error) => {
                console.error('Error saving partido or players:', error);
                alert('La captura de datos tuvo un error. Por favor, intenta nuevamente.');
            });
    };


    return (
        <div style={{ background: '#202124', color: '#000', minHeight: '100vh', padding: '20px' , paddingTop: '80px' }}>
            &nbsp;
            <h1 className="text-left" style={{color: '#F4B205'}}>
                CDO Tournament
            </h1>
            &nbsp;
            <div className="container" style={{ padding: '20px' }}>
                &nbsp;
                <h2 className="text-center" style={{ color: '#ffffff' }}>
                    Agregar Jugador a Equipo
                </h2>
                &nbsp;
                <div className="row justify-content-center">
                    <div className="card col-md-8" style={{ background: '#bcbdbe', color: '#000' }}>
                        <div className="card-body">
                            <form>
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
                                <button
                                    className="btn btn-success"
                                    onClick={saveJugadorEnEquipo}
                                    style={{ background: '#F4B205', color: '#fff' }}
                                >
                                    Guardar
                                </button>
                                <Link
                                    to={`/perfilEquipo/${idEquipo}`}
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

export default AddJugadorAEquipoForm;
