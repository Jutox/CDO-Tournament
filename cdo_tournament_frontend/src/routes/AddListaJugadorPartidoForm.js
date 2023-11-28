import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EquipoService from '../services/EquipoService'; // Asegúrate de importar el servicio adecuado
import PartidoService from '../services/PartidoService';
import JugadorPartidoService from '../services/ListaJugadoresPartidoService';

const AddListaJugadoresPartidoForm = () => {
    const [listaJugadoresPartido, setListaJugadoresPartido] = useState({
        equipo: null,
        partido: null,
    });

    const [equipos, setEquipos] = useState([]);
    const [partidos, setPartidos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Obtener la lista de equipos y partidos para las selecciones en el formulario
        EquipoService.getEquipos()
            .then((response) => {
                setEquipos(response.data);
            })
            .catch((error) => {
                console.error('Error fetching teams:', error);
            });

        PartidoService.getPartidos()
            .then((response) => {
                setPartidos(response.data);
            })
            .catch((error) => {
                console.error('Error fetching matches:', error);
            });
    }, []);

    const saveListaJugadoresPartido = (e) => {
        e.preventDefault();

        JugadorPartidoService.createListaJugadoresPartido(listaJugadoresPartido)
            .then((response) => {
                console.log(response.data);
                navigate("/listaJugadoresPartidos"); // Ajusta la ruta según tu aplicación
            })
            .catch((error) => {
                console.log(error);
                alert('Error al capturar datos. Por favor, inténtalo nuevamente.');
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setListaJugadoresPartido({ ...listaJugadoresPartido, [name]: value });
    };

    const handleEquipoChange = (e) => {
        const equipoId = e.target.value;
        const selectedEquipo = equipos.find((equipo) => equipo.idEquipo === parseInt(equipoId));
        setListaJugadoresPartido({ ...listaJugadoresPartido, equipo: selectedEquipo });
    };

    const handlePartidoChange = (e) => {
        const partidoId = e.target.value;
        const selectedPartido = partidos.find((partido) => partido.idPartido === parseInt(partidoId));
        setListaJugadoresPartido({ ...listaJugadoresPartido, partido: selectedPartido });
    };

    return (
        <div style={{ background: '#d4d1d0', color: '#000', minHeight: '93vh' }}>
            <div className="container" style={{ padding: '20px' }}>
                <h2 className="text-center" style={{ color: '#000' }}>
                    Agregar Lista de Jugadores para el Partido
                </h2>
                <div className="row justify-content-center">
                    <div className="card col-md-8" style={{ background: '#bcbdbe', color: '#000' }}>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Equipo:</label>
                                    <select
                                        className="form-control"
                                        name="equipo"
                                        value={listaJugadoresPartido.equipo ? listaJugadoresPartido.equipo.idEquipo : ''}
                                        onChange={handleEquipoChange}
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    >
                                        <option value="">Seleccione un equipo</option>
                                        {equipos.map((equipo) => (
                                            <option key={equipo.idEquipo} value={equipo.idEquipo}>
                                                {equipo.nombreEquipo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Partido:</label>
                                    <select
                                        className="form-control"
                                        name="partido"
                                        value={listaJugadoresPartido.partido ? listaJugadoresPartido.partido.idPartido : ''}
                                        onChange={handlePartidoChange}
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    >
                                        <option value="">Seleccione un partido</option>
                                        {partidos.map((partido) => (
                                            <option key={partido.idPartido} value={partido.idPartido}>
                                                {partido.nombreCompeticion}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Puedes agregar más campos según tus necesidades */}
                                <button
                                    className="btn btn-success"
                                    onClick={saveListaJugadoresPartido}
                                    style={{ background: '#F4B205', color: '#fff' }}
                                >
                                    Guardar
                                </button>
                                &nbsp;&nbsp;&nbsp;
                                <Link
                                    to="/listaJugadoresPartidos"
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

export default AddListaJugadoresPartidoForm;
