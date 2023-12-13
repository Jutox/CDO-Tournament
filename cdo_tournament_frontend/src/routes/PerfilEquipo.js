import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import jsPDF from 'jspdf';
import {Button, Pagination, Table} from 'react-bootstrap';
import Chart from 'chart.js/auto';

import EquipoService from '../services/EquipoService';
import PartidoService from '../services/PartidoService';
import JugadorPartidoService from '../services/JugadorPartidoService';

export const PerfilEquipo = () => {
    const { id } = useParams();
    const [partidos, setPartidos] = useState([]);
    const [torneos, setTorneos] = useState([]);
    const [selectedPartidoId, setSelectedPartidoId] = useState('');
    const [selectedTorneoId, setSelectedTorneoId] = useState('');
    const [showChart, setShowChart] = useState(false);
    const [selectedPartido, setSelectedPartido] = useState('');
    const [jugadoresPartido, setJugadorPartido] = useState([]);
    const [listaJugadoresPartido, setListaJugadoresPartido] = useState([]);

    const [equipo, setEquipo] = useState({
        nombreEquipo: '',
        entrenador: '',
        // Add other relevant fields here
    });

    const [jugador, setJugador] = useState({
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        rut: '',
        fechaNacimiento: null,
        genero: '',
        telefono: '',
        email: '',
        estatura: '',
        peso: '',
        alcanceMano: '',
        alcanceBloqueo: '',
    });

    const [jugadores, setJugadores] = useState([]);

    const ataquesChartRef = useRef(null);
    const saquesChartRef = useRef(null);

    useEffect(() => {
        EquipoService.getEquipoById(id)
            .then((response) => {
                const equipoData = response.data;
                setEquipo(equipoData);
            })
            .catch((error) => {
                console.error('Error fetching equipo:', error);
            });

        PartidoService.getPartidos()
            .then((partidosResponse) => {
                const partidosData = partidosResponse.data;
                setPartidos(partidosData);
            })
            .catch((partidosError) => {
                console.error('Error fetching partidos:', partidosError);
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
                        jugadoresUnicos.add(eventos.jugador.idJugador);
                        return eventos.jugador;
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

        JugadorPartidoService.getJugadoresPartido()
            .then((response) => {
                if (!Array.isArray(response.data)) {
                    throw new Error('La respuesta no es un array');
                }

                const jugadoresUnicos = new Set();

                const promises = response.data.map((eventos) => {
                    if (
                        eventos.listaJugadoresPartido.equipo.idEquipo === parseInt(id)
                    ) {
                        return eventos;
                    }
                    return null;
                });
                return Promise.all(promises.filter(Boolean));
            })
            .then((jugadores) => {
                setJugadorPartido(jugadores);
            })
            .catch((error) => {
                console.error('Error al obtener jugadores:', error);
            });

        JugadorPartidoService.getJugadoresPartido()
            .then((response) => {
                setJugadorPartido(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const exportToPDF = () => {
        const doc = new jsPDF();

        const iconStyle = {
            width: 50,
            height: 50,
        };
        doc.addImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrObGYcoNyS8zpekqt8iMVvp4YzOHD3qdgx1lsd7Im1om0p3bEuiyWIUAjSa8xN-hdWVM&usqp=CAU", "JPEG", 175, 5, 30, 25);

        doc.text("Reporte " + equipo.nombreEquipo, 10, 20);

        doc.setFontSize(12);

        // Agregar información del equipo al PDF
        doc.text("Nombre: " + equipo.nombreEquipo, 10, 35);
        doc.text("Entrenador: " + equipo.entrenador, 10, 42);
        // Add other relevant fields here...

        // Agregar los gráficos generados por EstadisticaPersonal al PDF
        const ataquesChartCanvas = document.getElementById('grafico-ataques');
        const saquesChartCanvas = document.getElementById('grafico-saques');

        if (ataquesChartCanvas && saquesChartCanvas) {
            const ataquesDataURL = ataquesChartCanvas.toDataURL();
            const saquesDataURL = saquesChartCanvas.toDataURL();

            doc.addImage(ataquesDataURL, 'JPEG', 10, 140, 90, 90);
            doc.addImage(saquesDataURL, 'JPEG', 110, 140, 90, 90);
        }

        doc.save('perfil_equipo.pdf');
    }

    const handlePartidoChange = (event) => {
        setSelectedPartido(event.target.value)

        const filteredJugadores = jugadoresPartido.filter((eventos) => {
            if(eventos.listaJugadoresPartido.partido !== null && eventos.listaJugadoresPartido.equipo.idEquipo === parseInt(id) && eventos.listaJugadoresPartido.partido.idPartido === parseInt(event.target.value)){
                return eventos.listaJugadoresPartido.partido.idPartido;
            }else{
                return null
            }
        });
        console.log(filteredJugadores)
        setListaJugadoresPartido(filteredJugadores);
    };

    return (
        <div>
            <div style={{ background: "#202124", color: "#000", minHeight: "93vh" }}>
                <div className="container" style={{ padding: "20px" }}>
                    &nbsp;
                    <h2 className="text-center" style={{ color: '#ffffff' }}>Perfil del Equipo</h2>
                    &nbsp;
                    <div className="row justify-content-center">
                        <div className="card col-md-8" style={{ background: "#bcbdbe", color: "#000" }}>
                            <div className="card-body">
                                <div style={{ height: "70px", display: "flex", alignItems: "center" }}>
                                    <Link to="/equipos" className="btn btn-secondary" style={{ background: "#6C757D", color: "#fff" }}>
                                        Volver
                                    </Link>
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <Link
                                        to={`/updateEquipo/${equipo.idEquipo}`}
                                        className="btn btn-warning"
                                        style={{ background: "#F4B205", color: "#000", width: "auto" }}
                                    >
                                        Actualizar
                                    </Link>
                                    <button
                                        onClick={exportToPDF}
                                        className="btn btn-warning"
                                        style={{ marginLeft: "auto" }}
                                    >
                                        Exportar a PDF
                                    </button>
                                </div>
                                <form>
                                        <div className="form-group row mb-2" >
                                            <div className="row mb-2">
                                                <div className="col-sm-3">
                                                    <label style={{ color: '#000' }}>Nombre Equipo:</label>
                                                </div>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="text"
                                                        placeholder="Nombre de la Competición"
                                                        name="nombreCompeticion"
                                                        className="form-control"
                                                        value={equipo.nombreEquipo}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-sm-3">
                                                    <label style={{ color: '#000' }}>Entrenador:</label>
                                                </div>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="text"
                                                        placeholder="Ciudad"
                                                        name="ciudad"
                                                        className="form-control"
                                                        value={equipo.nombreEntrenador}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    &nbsp;

                    <div className="row justify-content-center">
                        <Table striped bordered hover variant="light" className="table-xl">
                            <thead>
                            <tr>
                                <th>Nombres</th>
                                <th>Rut</th>
                                <th>Apellidos</th>
                                <th>Fecha Nacimiento</th>
                                <th>Genero</th>
                                <th>Telefono</th>
                                <th>Email</th>
                                <th>Estatura</th>
                                <th>Peso</th>
                                <th>Alcance Mano</th>
                                <th>Alcance Bloqueo</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {jugadores.map((jugador) => (
                                <tr key={jugador.idJugador}>
                                    <td>{jugador.nombres}</td>
                                    <td>{jugador.rut}</td>
                                    <td>{jugador.apellidoPaterno + ' ' + jugador.apellidoMaterno}</td>
                                    <td>{jugador.fechaNacimiento}</td>
                                    <td>{jugador.genero}</td>
                                    <td>{jugador.telefono}</td>
                                    <td>{jugador.email}</td>
                                    <td>{jugador.estatura}</td>
                                    <td>{jugador.peso}</td>
                                    <td>{jugador.alcanceMano}</td>
                                    <td>{jugador.alcanceBloqueo}</td>
                                    <td>
                                        <Link
                                            to={`/perfilJugador/${jugador.idJugador}`}
                                            className="btn btn-warning"
                                            style={{ background: "#F4B205", color: "#000", width: "auto" }}
                                        >
                                            Ver Perfil
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link
                                to= {`/perfilAddJugadorAEquipo/${id}`}
                                className="btn btn-primary mb-2"
                                style={{ backgroundColor: '#F4B205', color: '#000' }}
                            >
                                Agregar Jugador
                            </Link>
                        </div>

                        <div className="col-md-6 d-flex justify-content-end">
                            <Link
                                to= {`/perfilAddJugadorPartidoEquipoForm/${id}`}
                                className="btn btn-primary mb-2"
                                style={{ backgroundColor: '#F4B205', color: '#000' }}
                            >
                                Agregar Jugador a Partido
                            </Link>
                        </div>
                    </div>

                    &nbsp;

                    <div className="row">
                    <select
                        className="form-control"
                        onChange={handlePartidoChange}
                        value={selectedPartido}
                    >
                        <option value="">Seleccionar Partido</option>
                        {partidos.map((partido) => (
                            <option key={partido.idPartido} value={partido.idPartido}>
                                {partido.nombreCompeticion}
                            </option>
                        ))}
                    </select>
                    </div>

                    &nbsp;

                        <div className="container" style={{ padding: '20px' }}>
                            <h2 className="text-center" style={{ color: '#ffffff' }}>Jugador Partido</h2>
                            <div className="row justify-content-center">
                                <Table striped bordered hover variant="light" className="table-xl">
                                    <thead>
                                    <tr>
                                        <th>ID Jugador Partido</th>
                                        <th>Número Camiseta</th>
                                        <th>Capitán</th>
                                        <th>Jugador</th>
                                        <th>ID Lista</th>
                                        <th>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {listaJugadoresPartido.map((jugadorPartido) => (
                                        <tr key={jugadorPartido.idJugadorPartido}>
                                            <td>{jugadorPartido.idJugadorPartido}</td>
                                            <td>{jugadorPartido.numeroCamiseta}</td>
                                            <td>{jugadorPartido.capitan ? "Sí" : "No"}</td>
                                            <td>{jugadorPartido.jugador.nombres}</td>
                                            <td>{jugadorPartido.listaJugadoresPartido.idListaJugadoresPartido}</td>

                                            <td>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilEquipo;
