import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JugadorService from '../services/JugadorService';
import ListaJugadoresPartidoService from '../services/ListaJugadoresPartidoService';
import JugadorPartidoService from '../services/JugadorPartidoService';

const AddJugadorPartidoForm = () => {
    const [jugadorPartido, setJugadorPartido] = useState({
        numeroCamiseta: 0,
        capitan: false,
        jugador: null,
        listaJugadoresPartido: null,
    });

    const [jugadores, setJugadores] = useState([]);
    const [listasJugadoresPartido, setListasJugadoresPartido] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        JugadorService.getJugadores()
            .then((response) => {
                setJugadores(response.data);
            })
            .catch((error) => {
                console.error('Error fetching players:', error);
            });

        ListaJugadoresPartidoService.getListasJugadoresPartido()
            .then((response) => {
                setListasJugadoresPartido(response.data);
            })
            .catch((error) => {
                console.error('Error fetching player lists for the match:', error);
            });
    }, []);

    const saveJugadorPartido = (e) => {
        e.preventDefault();

        JugadorPartidoService.createJugadorPartido(jugadorPartido)
            .then((response) => {
                console.log(response.data);
                navigate('/jugadorPartido');
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
        const selectedJugador = jugadores.find((jugador) => jugador.idJugador === parseInt(jugadorId));
        setJugadorPartido({ ...jugadorPartido, jugador: selectedJugador });
    };

    const handleListaJugadoresPartidoChange = (e) => {
        const listaJugadoresPartidoId = e.target.value;
        const selectedListaJugadoresPartido = listasJugadoresPartido.find(
            (lista) => lista.idListaJugadoresPartido === parseInt(listaJugadoresPartidoId)
        );
        setJugadorPartido({ ...jugadorPartido, listaJugadoresPartido: selectedListaJugadoresPartido });
    };

    return (
        <div style={{ background: '#202124', color: '#000', minHeight: '100vh', padding: '20px' , paddingTop: '80px' }}>
            &nbsp;
            <h1 className="text-left" style={{color: '#F4B205'}}>
                CDO Tournament
            </h1>
            &nbsp;
            <div className="container" style={{ padding: '20px' }}>
                <h2 className="text-center" style={{ color: '#000' }}>
                    Crear Jugador de Partido
                </h2>
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
                                        value={jugadorPartido.jugador ? jugadorPartido.jugador.idJugador : ''}
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
                                                {lista.idListaJugadoresPartido}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    onClick={saveJugadorPartido}
                                    className="btn btn-success"
                                    style={{ background: '#F4B205', color: '#fff' }}
                                >
                                    Guardar Jugador de Partido
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddJugadorPartidoForm;
