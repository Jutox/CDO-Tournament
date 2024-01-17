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
import EventoService from "../services/EventosService";
import eventoService from "../services/EventosService";
import TorneoService from "../services/TorneoService";
import * as IoIcons from "react-icons/io";

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
    const [selectedTorneo, setSelectedTorneo] = useState('');

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

    const [ataquesExitosos, setAtaquesExitosos] = useState(0);
    const [ataquesFallidos, setAtaquesFallidos] = useState(0);
    const [saquesExitosos, setSaquesExitosos] = useState(0);
    const [saquesFallidos, setSaquesFallidos] = useState(0);
    const [advertencias, setAdvertencias] = useState(0);
    const [descalificaciones, setDescalificaciones] = useState(0);
    const [penalizaciones, setPenalizaciones] = useState(0);
    const [cantidadBloqueosExitosos, setCantidadBloqueosExitosos] = useState(0);


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

        TorneoService.getTorneos()
            .then((torneosResponse) => {
                const torneosData = torneosResponse.data;
                setTorneos(torneosData);
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
                console.log("API Response:", response.data);
                if (!Array.isArray(response.data)) {
                    throw new Error('La respuesta no es un array');
                }

                // Filter the events directly based on the condition
                const filteredEventos = response.data.filter(evento =>
                    evento.listaJugadoresPartido &&
                    evento.listaJugadoresPartido.equipo &&
                    evento.listaJugadoresPartido.equipo.idEquipo == parseInt(id)
                );

                setJugadorPartido(filteredEventos);
            })
            .catch((error) => {
                // Enhanced error logging
                console.error('Error al obtener jugadores:', error.message, error);
            });

    }, []);

    // Función para exportar a PDF
    const exportToPDF = () => {
        const doc = new jsPDF();

        // Cambiar el estilo de fuente y tamaño
        doc.setFont("helvetica");
        doc.setFontSize(14);

        // Agregar una línea debajo del título
        doc.setTextColor(0, 0, 0); // Color negro
        doc.setFontSize(24);
        doc.text("Reporte " + equipo.nombreEquipo, 10, 20);

        let yPosition = 30; // Coordenada Y inicial para la información del jugador

        if (!(selectedPartidoId === '')) {
            doc.text("Partido: " + selectedPartido.nombreCompeticion, 10, yPosition);
        } else if (!(selectedTorneoId=== '')) {
            doc.text("Torneo: " + selectedTorneo.nombre, 10, yPosition);
        }

        yPosition += 10; // Incrementar la coordenada Y

        doc.setLineWidth(0.5);
        doc.line(10, yPosition, 200, yPosition); // Línea debajo del título

        // Alinear y espaciar el texto
        doc.setTextColor(0, 0, 0); // Color negro
        doc.setFontSize(14);
        doc.text("Nombre: " + equipo.nombreEquipo, 10, yPosition += 7);
        doc.text("Entrenador: " + equipo.nombreEntrenador, 10, yPosition += 7);



        // Define table column positions
        const col1X = 10;
        const col2X = 70;
        const col3X = 110;

        yPosition += 7;


// Iterate through the players and add rows to the table
        /*
        listaJugadoresPartido.forEach((evento) => {
            console.log("jugadorPartido: ", evento.jugadorPartido);
            if (evento.jugadorPartido && evento.jugadorPartido.numeroCamiseta) {
                doc.text(evento.jugadorPartido.numeroCamiseta, col1X, yPosition);
            } else {
                doc.text("N/A", col1X, yPosition); // Handle missing data
            }

            if (evento.jugadorPartido && evento.jugadorPartido.capitan) {
                doc.text(evento.jugadorPartido.capitan, col2X, yPosition);
            } else {
                doc.text("N/A", col2X, yPosition); // Handle missing data
            }

            if (evento.jugadorPartido && evento.jugadorPartido.jugador && evento.jugadorPartido.jugador.nombres) {
                doc.text(evento.jugadorPartido.jugador.nombres, col3X, yPosition);
            } else {
                doc.text("N/A", col3X, yPosition); // Handle missing data
            }

            // Increment the Y position for the next row
            yPosition += 7;
        });*/


        // Aquí debes ajustar las coordenadas de las estadísticas
        yPosition += 7; // Incrementa la coordenada Y antes de las estadísticas

        doc.text("Cant. Bloqueos Exitosos: " + cantidadBloqueosExitosos, 10, yPosition += 7);
        doc.text("AtaquesExitosos: " + ataquesExitosos, 120, yPosition);
        doc.text("Advertencias: " + advertencias, 10, yPosition += 7);
        doc.text("AtaquesFallidos: " + ataquesFallidos*-1, 120, yPosition);
        doc.text("Descalificaciones: " + descalificaciones, 10, yPosition += 7);
        doc.text("SaquesExitosos: " + saquesExitosos, 120, yPosition);
        doc.text("Penalizaciones: " + penalizaciones, 10, yPosition += 7);
        doc.text("SaquesFallidos: " + saquesFallidos*-1, 120, yPosition);


        // Agregar la imagen arriba del PDF
        doc.addImage(
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrObGYcoNyS8zpekqt8iMVvp4YzOHD3qdgx1lsd7Im1om0p3bEuiyWIUAjSa8xN-hdWVM&usqp=CAU",
            "JPEG",
            175, // Coordenada X
            5,   // Coordenada Y
            22,  // Ancho de la imagen
            18   // Alto de la imagen
        );

        // Agregar los gráficos generados por EstadisticaPersonal al PDF
        const ataquesChartCanvas = document.getElementById('grafico-ataques');
        const saquesChartCanvas = document.getElementById('grafico-saques');

        if (ataquesChartCanvas && saquesChartCanvas) {
            const ataquesDataURL = ataquesChartCanvas.toDataURL();
            const saquesDataURL = saquesChartCanvas.toDataURL();

            // Ajusta las coordenadas y el tamaño de los gráficos según tu diseño
            doc.addImage(ataquesDataURL, 'JPEG', 10, yPosition += 7, 90, 90);
            doc.addImage(saquesDataURL, 'JPEG', 110, yPosition, 90, 90);
        }

        doc.save('perfil_equipo.pdf');
    }


    const fetchJugadorStatistics = (id) => {
        setAtaquesExitosos(0);
        setAtaquesFallidos(0);
        setSaquesExitosos(0);
        setSaquesFallidos(0);


        console.log("jugador: ",equipo.idEquipo, "partido: ", parseInt(selectedPartidoId), "torneo: ", selectedTorneoId);


        EventoService.getAtaquesExitososByIdEquipo(equipo.idEquipo)
            .then((response) => {
                let totalExitosos = 0;

                response.data.forEach((evento) => {
                    const idTorneo = '' + evento.jugadorPartido.listaJugadoresPartido.partido.torneo.idTorneo;
                    const idPartido = '' + evento.jugadorPartido.listaJugadoresPartido.partido.idPartido;


                    if (selectedTorneoId !== '' && selectedPartidoId !== '') {
                        if (idTorneo === selectedTorneoId && idPartido === selectedPartidoId) {
                            totalExitosos++;
                        }
                    } else if (selectedTorneoId !== '') {
                        if (idTorneo === selectedTorneoId) {
                            totalExitosos++;
                        }
                    } else if (selectedPartidoId !== '') {
                        if (idPartido === selectedPartidoId) {
                            totalExitosos++;
                        }
                    } else {
                        totalExitosos++;
                    }
                });

                setAtaquesExitosos(totalExitosos);
            })
            .catch((error) => {
                console.error('Error fetching ataques exitosos:', error);
            });

        EventoService.getAtaquesFallidosByIdEquipo(equipo.idEquipo)
            .then((response) => {
                let totalFallidos = 0;

                response.data.forEach((evento) => {
                    const idTorneo = '' + evento.jugadorPartido.listaJugadoresPartido.partido.torneo.idTorneo;
                    const idPartido = '' + evento.jugadorPartido.listaJugadoresPartido.partido.idPartido;

                    if (selectedTorneoId !== '' && selectedPartidoId !== '') {
                        if (idTorneo === selectedTorneoId && idPartido === selectedPartidoId) {
                            totalFallidos += evento.puntos;
                        }
                    } else if (selectedTorneoId !== '') {
                        if (idTorneo === selectedTorneoId) {
                            totalFallidos += evento.puntos;
                        }
                    } else if (selectedPartidoId !== '') {
                        if (idPartido === selectedPartidoId) {
                            totalFallidos += evento.puntos;
                        }
                    } else {
                        totalFallidos += evento.puntos;
                    }
                });

                setAtaquesFallidos(totalFallidos);
            })
            .catch((error) => {
                console.error('Error fetching ataques fallidos:', error);
            });

        // Obtener el total de saques exitosos
        EventoService.getSaquesExitososByIdEquipo(equipo.idEquipo)
            .then((response) => {
                let totalExitosos = 0;

                response.data.forEach((evento) => {
                    const idTorneo = '' + evento.jugadorPartido.listaJugadoresPartido.partido.torneo.idTorneo;
                    const idPartido = '' + evento.jugadorPartido.listaJugadoresPartido.partido.idPartido;

                    if (selectedTorneoId !== '' && selectedPartidoId !== '') {
                        if (idTorneo === selectedTorneoId && idPartido === selectedPartidoId) {
                            totalExitosos += evento.puntos;
                        }
                    } else if (selectedTorneoId !== '') {
                        if (idTorneo === selectedTorneoId) {
                            totalExitosos += evento.puntos;
                        }
                    } else if (selectedPartidoId !== '') {
                        if (idPartido === selectedPartidoId) {
                            totalExitosos += evento.puntos;
                        }
                    } else {
                        totalExitosos += evento.puntos;
                    }
                });

                setSaquesExitosos(totalExitosos);
            })
            .catch((error) => {
                console.error('Error fetching saques exitosos:', error);
            });

        EventoService.getSaquesFallidosByIdEquipo(equipo.idEquipo)
            .then((response) => {
                let totalFallidos = 0;

                response.data.forEach((evento) => {
                    const idTorneo = '' + evento.jugadorPartido.listaJugadoresPartido.partido.torneo.idTorneo;
                    const idPartido = '' + evento.jugadorPartido.listaJugadoresPartido.partido.idPartido;

                    if (selectedTorneoId !== '' && selectedPartidoId !== '') {
                        if (idTorneo === selectedTorneoId && idPartido === selectedPartidoId) {
                            totalFallidos += evento.puntos;
                        }
                    }
                    else if (selectedTorneoId !== '') {
                        if (idTorneo === selectedTorneoId) {
                            totalFallidos += evento.puntos;
                        }
                    } else if (selectedPartidoId !== '') {
                        if (idPartido === selectedPartidoId) {
                            totalFallidos += evento.puntos;
                        }
                    } else {
                        totalFallidos += evento.puntos;
                    }
                });

                setSaquesFallidos(totalFallidos);
            })
            .catch((error) => {
                console.error('Error fetching saques fallidos:', error);
            });

        eventoService.getBloqueosExitososByIdEquipo(equipo.idEquipo)
            .then((response) => {
                const eventos = response.data;
                let cantidadExitosos = 0;

                eventos.forEach((evento) => {
                    const idTorneo = '' + evento.jugadorPartido.listaJugadoresPartido.partido.torneo.idTorneo;
                    const idPartido = '' + evento.jugadorPartido.listaJugadoresPartido.partido.idPartido;

                    if (selectedTorneoId !== '' && selectedPartidoId !== '') {
                        if (idTorneo === selectedTorneoId && idPartido === selectedPartidoId) {
                            cantidadExitosos++;
                        }
                    } else if (selectedTorneoId !== '') {
                        if (idTorneo === selectedTorneoId) {
                            cantidadExitosos++;
                        }
                    } else if (selectedPartidoId !== '') {
                        if (idPartido === selectedPartidoId) {
                            cantidadExitosos++;
                        }
                    } else {
                        cantidadExitosos++;
                    }
                });
                setCantidadBloqueosExitosos(cantidadExitosos);
            })
            .catch((error) => {
                console.error('Error fetching bloqueos exitosos:', error);
            });

        eventoService.getAdvertenciasByIdEquipo(equipo.idEquipo)
            .then((response) => {
                const eventos = response.data;
                let cantidadAdvertencias = 0;

                eventos.forEach((evento) => {
                    const idTorneo = '' + evento.jugadorPartido.listaJugadoresPartido.partido.torneo.idTorneo;
                    const idPartido = '' + evento.jugadorPartido.listaJugadoresPartido.partido.idPartido;
                    if (selectedTorneoId !== '' && selectedPartidoId !== '') {
                        if (idTorneo === selectedTorneoId && idPartido === selectedPartidoId) {
                            cantidadAdvertencias++;
                        }
                    } else if (selectedTorneoId !== '') {
                        if (idTorneo === selectedTorneoId) {
                            cantidadAdvertencias++;
                        }
                    } else if (selectedPartidoId !== '') {
                        if (idPartido === selectedPartidoId) {
                            cantidadAdvertencias++;
                        }
                    } else {
                        cantidadAdvertencias++;
                    }
                });

                setAdvertencias(cantidadAdvertencias);
            })
            .catch((error) => {
                console.error('Error fetching advertencias:', error);
            });

        eventoService.getDescalificacionesByIdEquipo(equipo.idEquipo)
            .then((response) => {
                const eventos = response.data;
                let cantidadDescalificaciones = 0;

                eventos.forEach((evento) => {
                    const idTorneo = '' + evento.jugadorPartido.listaJugadoresPartido.partido.torneo.idTorneo;
                    const idPartido = '' + evento.jugadorPartido.listaJugadoresPartido.partido.idPartido;

                    if (selectedTorneoId !== '' && selectedPartidoId !== '') {
                        if (idTorneo === selectedTorneoId && idPartido === selectedPartidoId) {
                            cantidadDescalificaciones++;
                        }
                    } else if (selectedTorneoId !== '') {
                        if (idTorneo === selectedTorneoId) {
                            cantidadDescalificaciones++;
                        }
                    } else if (selectedPartidoId !== '') {
                        if (idPartido === selectedPartidoId) {
                            cantidadDescalificaciones++;
                        }
                    } else {
                        cantidadDescalificaciones++;
                    }
                });

                setDescalificaciones(cantidadDescalificaciones);
            })
            .catch((error) => {
                console.error('Error fetching descalificaciones:', error);
                // Manejar el error
            });

        eventoService.getPenalizacionesByIdEquipo(equipo.idEquipo)
            .then((response) => {
                const eventos = response.data;
                let cantidadPenalizaciones = 0;

                eventos.forEach((evento) => {
                    const idTorneo = '' + evento.jugadorPartido.listaJugadoresPartido.partido.torneo.idTorneo;
                    const idPartido = '' + evento.jugadorPartido.listaJugadoresPartido.partido.idPartido;

                    if (selectedTorneoId !== '' && selectedPartidoId !== '') {
                        if (idTorneo === selectedTorneoId && idPartido === selectedPartidoId) {
                            cantidadPenalizaciones++;
                        }
                    } else if (selectedTorneoId !== '') {
                        if (idTorneo === selectedTorneoId) {
                            cantidadPenalizaciones++;
                        }
                    } else if (selectedPartidoId !== '') {
                        if (idPartido === selectedPartidoId) {
                            cantidadPenalizaciones++;
                        }
                    } else {
                        cantidadPenalizaciones++;
                    }
                });

                setPenalizaciones(cantidadPenalizaciones);
            })
            .catch((error) => {
                console.error('Error fetching penalizaciones:', error);
            });
    };

    useEffect(() => {
        createOrUpdateCharts();
    }, [ataquesExitosos, ataquesFallidos, saquesExitosos, saquesFallidos]);

    const createOrUpdateCharts = () => {
        if (ataquesChartRef.current) {
            ataquesChartRef.current.destroy();
        }
        const ataquesCtx = document.getElementById('grafico-ataques').getContext('2d');
        ataquesChartRef.current = new Chart(ataquesCtx, {
            type: 'pie',
            data: {
                labels: ['Ataques Exitosos', 'Ataques Fallidos'],
                datasets: [
                    {
                        data: [ataquesExitosos, ataquesFallidos],
                        backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                    },
                ],
            },
        });

        if (saquesChartRef.current) {
            saquesChartRef.current.destroy();
        }
        const saquesCtx = document.getElementById('grafico-saques').getContext('2d');
        saquesChartRef.current = new Chart(saquesCtx, {
            type: 'pie',
            data: {
                labels: ['Saques Exitosos', 'Saques Fallidos'],
                datasets: [
                    {
                        data: [saquesExitosos, saquesFallidos],
                        backgroundColor: ['rgba(255, 205, 86, 1)', 'rgba(54, 162, 235, 1)'],
                    },
                ],
            },
        });
    };

    useEffect(() => {
        PartidoService.getPartidoById(selectedPartidoId)
            .then((partidosResponse) => {
                const partidosData = partidosResponse.data;
                setSelectedPartido(partidosData);
            })
            .catch((partidosError) => {
                console.error('Error fetching partidos:', partidosError);
            });

        TorneoService.getTorneoById(selectedTorneoId)
            .then((torneosResponse) => {
                const torneosData = torneosResponse.data;
                setSelectedTorneo(torneosData);
            })
            .catch((partidosError) => {
                console.error('Error fetching partidos:', partidosError);
            });

    }, [selectedPartidoId, selectedTorneoId]);

    const handlePartidoChange = (event) => {
        setSelectedPartidoId(event.target.value);

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
            <div style={{ background: "#202124", color: "#000", minHeight: "100vh", paddingTop: '80px' }}>
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
                    </div>

                    &nbsp;

                    <div className="row">

                        &nbsp;
                        <div className="form-group mb-2" style={{ display: 'flex', gap: '20px' }}>
                            <label style={{ color: '#ffffff' }}>Partido:</label>
                            <select
                                className="form-control"
                                onChange={handlePartidoChange}
                                value={selectedPartidoId}
                            >
                                <option value="">Seleccionar Partido</option>
                                {partidos.map((partido) => (
                                    <option key={partido.idPartido} value={partido.idPartido}>
                                        {partido.nombreCompeticion}
                                    </option>
                                ))}
                            </select>

                            <label style={{ color: '#ffffff' }}>Torneo:</label>
                            <select
                                className="form-control"
                                onChange={(e) => setSelectedTorneoId(e.target.value)}
                                value={selectedTorneoId}
                                style={{ background: '#e6e5e5', color: '#151414' }}
                            >
                                <option value="">Todos los torneos</option>
                                {torneos.map((torneo) => (
                                    <option key={torneo.idTorneo} value={torneo.idTorneo}>
                                        {torneo.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        &nbsp;
                        <div className="row justify-content-start">
                            <Button
                                variant="primary"
                                onClick={fetchJugadorStatistics}
                                style={{ backgroundColor: '#F4B205', color: '#000', marginTop: '10px', width: '210px', height: '40px', fontSize: '16px' }}
                            >
                             Generar Estadisticas <IoIcons.IoIosStats />
                            </Button>
                        </div>

                    </div>

                    &nbsp;
                    <div></div>
                    &nbsp;
                    &nbsp;
                    <div className="row justify-content-center">
                        <div className="card col-md-8" style={{ background: "#bcbdbe", color: "#000" }}>
                            <div className="card-body">
                                <form>
                                    <div className="form-group row mb-2">
                                        <div className="col-sm-3">
                                            <label className="col-form-label" style={{ color: "#000" }}>Bloqueos Exitosos:</label>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                placeholder="Bloqueos Exitosos"
                                                name="cantidadBloqueosExitosos"
                                                className="form-control"
                                                value={cantidadBloqueosExitosos || ''}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-2">
                                        <div className="col-sm-3">
                                            <label className="col-form-label" style={{ color: "#000" }}>Advertencias:</label>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                placeholder="Advertencias"
                                                name="cantidadAdvertencias"
                                                className="form-control"
                                                value={advertencias || ''}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-2">
                                        <div className="col-sm-3">
                                            <label className="col-form-label" style={{ color: "#000" }}>Descalificaciones:</label>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                placeholder="Descalificaciones"
                                                name="cantidadDescalificaciones"
                                                className="form-control"
                                                value={descalificaciones || ''}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-2">
                                        <div className="col-sm-3">
                                            <label className="col-form-label" style={{ color: "#000" }}>Penalizaciones:</label>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                placeholder="Penalizaciones"
                                                name="cantidadPenalizaciones"
                                                className="form-control"
                                                value={penalizaciones || ''}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div style={{ background: '#202124', color: '#000', minHeight: '93vh' }}>
                        <div className="container" style={{ padding: '20px' }}>
                            <h2 className="text-center" style={{ color: '#ffffff' }}>Estadísticas de Jugador</h2>
                            &nbsp;
                            <div className="row justify-content-center">
                                <div className="col-md-6" style={{ color: '#ffffff' }}>
                                    <h3 className="text-center" >Estadísticas de Ataques</h3>
                                    <h5 className="text-center">Aqui se puede visualizar los Ataques Exitosos VS los Ataques Fallidos</h5>
                                    <canvas id="grafico-ataques" width="300" height="150"></canvas>
                                </div>
                                <div className="col-md-6" style={{ color: '#ffffff' }}>
                                    <h3 className="text-center">Estadísticas de Saques</h3>
                                    <h5 className="text-center">Aqui se puede visualizar los Saques Exitosos VS los Saques Fallidos</h5>
                                    <canvas id="grafico-saques" width="300" height="150"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilEquipo;
