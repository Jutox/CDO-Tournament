import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import jsPDF from 'jspdf'; // Importa la librería para generar PDF
import JugadorService from '../services/JugadorService';
import eventoService from '../services/EventosService';
import PartidoService from '../services/PartidoService';
import TorneoService from '../services/TorneoService';
import EstadisticaPersonal from './EstadisticaPersonal';
import {Button} from "react-bootstrap";
import EventoService from "../services/EventosService";
import Chart from 'chart.js/auto';

export const PerfilJugador = () => {
    const { id } = useParams();
    const [jugadorId, setJugadorId] = useState();
    const [partidos, setPartidos] = useState([]);
    const [torneos, setTorneos] = useState([]);
    const [selectedPartidoId, setSelectedPartidoId] = useState('');
    const [selectedTorneoId, setSelectedTorneoId] = useState('');
    const [showChart, setShowChart] = useState(false);
    const [ataquesExitosos, setAtaquesExitosos] = useState(0);
    const [ataquesFallidos, setAtaquesFallidos] = useState(0);
    const [saquesExitosos, setSaquesExitosos] = useState(0);
    const [saquesFallidos, setSaquesFallidos] = useState(0);
    const [advertencias, setAdvertencias] = useState(0);
    const [descalificaciones, setDescalificaciones] = useState(0);
    const [penalizaciones, setPenalizaciones] = useState(0);
    const [cantidadBloqueosExitosos, setCantidadBloqueosExitosos] = useState(0);

    const ataquesChartRef = useRef(null);
    const saquesChartRef = useRef(null);

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

    useEffect(() => {
        // Fetch jugador data by id and set it in the state
        JugadorService.getJugadorById(id)
            .then((response) => {
                const jugadorData = response.data;
                setJugador({
                    ...jugadorData,
                    fechaNacimiento: jugadorData.fechaNacimiento ? new Date(jugadorData.fechaNacimiento) : null,
                });
                setJugadorId(jugadorData.idJugador);
            })
            .catch((error) => {
                console.log(error);
                // Handle error
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
    }, [id]);


    // Función para exportar a PDF
    const exportToPDF = () => {
        const doc = new jsPDF();

        // Agregar la imagen arriba del PDF
        const iconStyle = {
            width: 50, // Ajusta el ancho de la imagen
            height: 50, // Ajusta la altura de la imagen
        };
        doc.addImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrObGYcoNyS8zpekqt8iMVvp4YzOHD3qdgx1lsd7Im1om0p3bEuiyWIUAjSa8xN-hdWVM&usqp=CAU", "JPEG", 175, 5, 30, 25); // Ajusta las coordenadas y el tamaño de la imagen

        doc.text("Reporte "+ jugador.nombres, 10, 20);

        doc.setFontSize(12);

        // Agregar información del jugador al PDF
        doc.text("Nombres: " + jugador.nombres, 10, 35);
        doc.text("Apellido Paterno: " + jugador.apellidoPaterno, 10, 42);
        doc.text("Apellido Materno: " + jugador.apellidoMaterno, 10, 49);
        doc.text("RUT: " + jugador.rut, 10, 56);
        doc.text("Fecha de Nacimiento: " + (jugador.fechaNacimiento ? jugador.fechaNacimiento.toLocaleDateString() : ''), 10, 63);
        doc.text("Género: " + jugador.genero, 10, 70);
        doc.text("Teléfono: " + jugador.telefono, 10, 77);
        doc.text("Email: " + jugador.email, 10, 84);
        doc.text("Estatura: " + jugador.estatura, 10, 91);
        doc.text("Peso: " + jugador.peso, 10, 98);
        doc.text("Alcance de Mano: " + jugador.alcanceMano, 10, 105);
        doc.text("Alcance de Bloqueo: " + jugador.alcanceBloqueo, 10, 112);
        doc.text("Cant. Bloqueos: " + cantidadBloqueosExitosos, 10, 119);

        // Agregar los gráficos generados por EstadisticaPersonal al PDF
        const ataquesChartCanvas = document.getElementById('grafico-ataques');
        const saquesChartCanvas = document.getElementById('grafico-saques');

        if (ataquesChartCanvas && saquesChartCanvas) {
            const ataquesDataURL = ataquesChartCanvas.toDataURL();
            const saquesDataURL = saquesChartCanvas.toDataURL();

            doc.addImage(ataquesDataURL, 'JPEG', 10, 140, 90, 90); // Ajusta las coordenadas y el tamaño según tu diseño
            doc.addImage(saquesDataURL, 'JPEG', 110, 140, 90, 90); // Ajusta las coordenadas y el tamaño según tu diseño
        }

        doc.save('perfil_jugador.pdf');
    }

    const handlePartidoSelection = (partidoId) => {
        setSelectedPartidoId(partidoId);
    };

    const handleGenerateChart = () => {
        setShowChart(true); // Cuando se haga clic en Generar Gráficos, establece el estado en true
    };

    const fetchJugadorStatistics = (id) => {
        setAtaquesExitosos(0);
        setAtaquesFallidos(0);
        setSaquesExitosos(0);
        setSaquesFallidos(0);


        console.log("jugador: ",jugadorId, "partido: ", selectedPartidoId, "torneo: ", selectedTorneoId);


            // Obtener el total de ataques exitosos
        EventoService.getAtaquesExitososByIdJugador(jugadorId)
            .then((response) => {
                let totalExitosos = 0;

                response.data.forEach((evento) => {
                    const idTorneo = '' + evento.jugadorPartido.listaJugadoresPartido.partido.torneo.idTorneo;
                    const idPartido = '' + evento.jugadorPartido.listaJugadoresPartido.partido.idPartido;


                    // Comprobar si se seleccionó un torneo y un partido
                    if (selectedTorneoId !== '' && selectedPartidoId !== '') {
                        if (idTorneo === selectedTorneoId && idPartido === selectedPartidoId) {
                            totalExitosos++;
                        }
                    }
                    // Comprobar si solo se seleccionó un torneo
                    else if (selectedTorneoId !== '') {
                        if (idTorneo === selectedTorneoId) {
                            totalExitosos++;
                        }
                    }
                    // Comprobar si solo se seleccionó un partido
                    else if (selectedPartidoId !== '') {
                        if (idPartido === selectedPartidoId) {
                            totalExitosos++;
                        }
                    }
                    // Si no se seleccionó ni torneo ni partido, contar todos los eventos
                    else {
                        totalExitosos++;
                    }
                });

                // Actualizar el estado con el total de eventos exitosos
                setAtaquesExitosos(totalExitosos);
            })
            .catch((error) => {
                console.error('Error fetching ataques exitosos:', error);
            });

            // Obtener el total de ataques fallidos
        EventoService.getAtaquesFallidosByIdJugador(jugadorId)
            .then((response) => {
                let totalFallidos = 0;

                response.data.forEach((evento) => {
                    const idTorneo = '' + evento.jugadorPartido.listaJugadoresPartido.partido.torneo.idTorneo;
                    const idPartido = '' + evento.jugadorPartido.listaJugadoresPartido.partido.idPartido;

                    // Comprobar si se seleccionó un torneo y un partido
                    if (selectedTorneoId !== '' && selectedPartidoId !== '') {
                        if (idTorneo === selectedTorneoId && idPartido === selectedPartidoId) {
                            totalFallidos += evento.puntos;
                        }
                    }
                    // Comprobar si solo se seleccionó un torneo
                    else if (selectedTorneoId !== '') {
                        if (idTorneo === selectedTorneoId) {
                            totalFallidos += evento.puntos;
                        }
                    }
                    // Comprobar si solo se seleccionó un partido
                    else if (selectedPartidoId !== '') {
                        if (idPartido === selectedPartidoId) {
                            totalFallidos += evento.puntos;
                        }
                    }
                    // Si no se seleccionó ni torneo ni partido, contar todos los eventos
                    else {
                        totalFallidos += evento.puntos;
                    }
                });

                // Actualizar el estado con el total de eventos fallidos
                setAtaquesFallidos(totalFallidos);
            })
            .catch((error) => {
                console.error('Error fetching ataques fallidos:', error);
            });

            // Obtener el total de saques exitosos
        EventoService.getSaquesExitososByIdJugador(jugadorId)
            .then((response) => {
                let totalExitosos = 0;

                response.data.forEach((evento) => {
                    const idTorneo = '' + evento.jugadorPartido.listaJugadoresPartido.partido.torneo.idTorneo;
                    const idPartido = '' + evento.jugadorPartido.listaJugadoresPartido.partido.idPartido;

                    // Comprobar si se seleccionó un torneo y un partido
                    if (selectedTorneoId !== '' && selectedPartidoId !== '') {
                        if (idTorneo === selectedTorneoId && idPartido === selectedPartidoId) {
                            totalExitosos += evento.puntos;
                        }
                    }
                    // Comprobar si solo se seleccionó un torneo
                    else if (selectedTorneoId !== '') {
                        if (idTorneo === selectedTorneoId) {
                            totalExitosos += evento.puntos;
                        }
                    }
                    // Comprobar si solo se seleccionó un partido
                    else if (selectedPartidoId !== '') {
                        if (idPartido === selectedPartidoId) {
                            totalExitosos += evento.puntos;
                        }
                    }
                    // Si no se seleccionó ni torneo ni partido, contar todos los eventos
                    else {
                        totalExitosos += evento.puntos;
                    }
                });

                // Actualizar el estado con el total de saques exitosos
                setSaquesExitosos(totalExitosos);
            })
            .catch((error) => {
                console.error('Error fetching saques exitosos:', error);
            });

            // Obtener el total de saques fallidos
        EventoService.getSaquesFallidosByIdJugador(jugadorId)
            .then((response) => {
                let totalFallidos = 0;

                response.data.forEach((evento) => {
                    const idTorneo = '' + evento.jugadorPartido.listaJugadoresPartido.partido.torneo.idTorneo;
                    const idPartido = '' + evento.jugadorPartido.listaJugadoresPartido.partido.idPartido;

                    // Comprobar si se seleccionó un torneo y un partido
                    if (selectedTorneoId !== '' && selectedPartidoId !== '') {
                        if (idTorneo === selectedTorneoId && idPartido === selectedPartidoId) {
                            totalFallidos += evento.puntos;
                        }
                    }
                    // Comprobar si solo se seleccionó un torneo
                    else if (selectedTorneoId !== '') {
                        if (idTorneo === selectedTorneoId) {
                            totalFallidos += evento.puntos;
                        }
                    }
                    // Comprobar si solo se seleccionó un partido
                    else if (selectedPartidoId !== '') {
                        if (idPartido === selectedPartidoId) {
                            totalFallidos += evento.puntos;
                        }
                    }
                    // Si no se seleccionó ni torneo ni partido, contar todos los eventos
                    else {
                        totalFallidos += evento.puntos;
                    }
                });

                // Actualizar el estado con el total de saques fallidos
                setSaquesFallidos(totalFallidos);
            })
            .catch((error) => {
                console.error('Error fetching saques fallidos:', error);
            });

        eventoService.getBloqueosExitososByIdJugador(jugadorId)
            .then((response) => {
                const eventos = response.data;
                let cantidadExitosos = 0;

                eventos.forEach((evento) => {
                    const idTorneo = '' + evento.jugadorPartido.listaJugadoresPartido.partido.torneo.idTorneo;
                    const idPartido = '' + evento.jugadorPartido.listaJugadoresPartido.partido.idPartido;

                    // Comprobar si se seleccionó un torneo y un partido
                    if (selectedTorneoId !== '' && selectedPartidoId !== '') {
                        if (idTorneo === selectedTorneoId && idPartido === selectedPartidoId) {
                            cantidadExitosos++;
                        }
                    }
                    // Comprobar si solo se seleccionó un torneo
                    else if (selectedTorneoId !== '') {
                        if (idTorneo === selectedTorneoId) {
                            cantidadExitosos++;
                        }
                    }
                    // Comprobar si solo se seleccionó un partido
                    else if (selectedPartidoId !== '') {
                        if (idPartido === selectedPartidoId) {
                            cantidadExitosos++;
                        }
                    }
                    // Si no se seleccionó ni torneo ni partido, contar todos los eventos
                    else {
                        cantidadExitosos++;
                    }
                });

                // Actualizar el estado con la cantidad de bloqueos exitosos
                setCantidadBloqueosExitosos(cantidadExitosos);
            })
            .catch((error) => {
                console.error('Error fetching bloqueos exitosos:', error);
                // Manejar el error
            });

        eventoService.getAdvertenciasByIdJugador(jugadorId)
            .then((response) => {
                const eventos = response.data;
                let cantidadAdvertencias = 0;

                eventos.forEach((evento) => {
                    const idTorneo = '' + evento.jugadorPartido.listaJugadoresPartido.partido.torneo.idTorneo;
                    const idPartido = '' + evento.jugadorPartido.listaJugadoresPartido.partido.idPartido;

                    // Comprobar si se seleccionó un torneo y un partido
                    if (selectedTorneoId !== '' && selectedPartidoId !== '') {
                        if (idTorneo === selectedTorneoId && idPartido === selectedPartidoId) {
                            cantidadAdvertencias++;
                        }
                    }
                    // Comprobar si solo se seleccionó un torneo
                    else if (selectedTorneoId !== '') {
                        if (idTorneo === selectedTorneoId) {
                            cantidadAdvertencias++;
                        }
                    }
                    // Comprobar si solo se seleccionó un partido
                    else if (selectedPartidoId !== '') {
                        if (idPartido === selectedPartidoId) {
                            cantidadAdvertencias++;
                        }
                    }
                    // Si no se seleccionó ni torneo ni partido, contar todas las advertencias
                    else {
                        cantidadAdvertencias++;
                    }
                });

                // Actualizar el estado con la cantidad de advertencias
                setAdvertencias(cantidadAdvertencias);
            })
            .catch((error) => {
                console.error('Error fetching advertencias:', error);
                // Manejar el error
            });

        eventoService.getDescalificacionesByIdJugador(jugadorId)
            .then((response) => {
                const eventos = response.data;
                let cantidadDescalificaciones = 0;

                eventos.forEach((evento) => {
                    const idTorneo = '' + evento.jugadorPartido.listaJugadoresPartido.partido.torneo.idTorneo;
                    const idPartido = '' + evento.jugadorPartido.listaJugadoresPartido.partido.idPartido;

                    // Comprobar si se seleccionó un torneo y un partido
                    if (selectedTorneoId !== '' && selectedPartidoId !== '') {
                        if (idTorneo === selectedTorneoId && idPartido === selectedPartidoId) {
                            cantidadDescalificaciones++;
                        }
                    }
                    // Comprobar si solo se seleccionó un torneo
                    else if (selectedTorneoId !== '') {
                        if (idTorneo === selectedTorneoId) {
                            cantidadDescalificaciones++;
                        }
                    }
                    // Comprobar si solo se seleccionó un partido
                    else if (selectedPartidoId !== '') {
                        if (idPartido === selectedPartidoId) {
                            cantidadDescalificaciones++;
                        }
                    }
                    // Si no se seleccionó ni torneo ni partido, contar todas las descalificaciones
                    else {
                        cantidadDescalificaciones++;
                    }
                });

                // Actualizar el estado con la cantidad de descalificaciones
                setDescalificaciones(cantidadDescalificaciones);
            })
            .catch((error) => {
                console.error('Error fetching descalificaciones:', error);
                // Manejar el error
            });

        eventoService.getPenalizacionesByIdJugador(jugadorId)
            .then((response) => {
                const eventos = response.data;
                let cantidadPenalizaciones = 0;

                eventos.forEach((evento) => {
                    const idTorneo = '' + evento.jugadorPartido.listaJugadoresPartido.partido.torneo.idTorneo;
                    const idPartido = '' + evento.jugadorPartido.listaJugadoresPartido.partido.idPartido;

                    // Comprobar si se seleccionó un torneo y un partido
                    if (selectedTorneoId !== '' && selectedPartidoId !== '') {
                        if (idTorneo === selectedTorneoId && idPartido === selectedPartidoId) {
                            cantidadPenalizaciones++;
                        }
                    }
                    // Comprobar si solo se seleccionó un torneo
                    else if (selectedTorneoId !== '') {
                        if (idTorneo === selectedTorneoId) {
                            cantidadPenalizaciones++;
                        }
                    }
                    // Comprobar si solo se seleccionó un partido
                    else if (selectedPartidoId !== '') {
                        if (idPartido === selectedPartidoId) {
                            cantidadPenalizaciones++;
                        }
                    }
                    // Si no se seleccionó ni torneo ni partido, contar todas las penalizaciones
                    else {
                        cantidadPenalizaciones++;
                    }
                });

                // Actualizar el estado con la cantidad de penalizaciones
                setPenalizaciones(cantidadPenalizaciones);
            })
            .catch((error) => {
                console.error('Error fetching penalizaciones:', error);
                // Manejar el error
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

// For saques chart
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

    return (
        <div>
            <div style={{ background: "#202124", color: "#000", minHeight: "93vh" }}>
                <div className="container" style={{ padding: "20px" }}>
                    &nbsp;
                    <h2 className="text-center" style={{ color: '#ffffff' }}>Perfil del Jugador</h2>
                    &nbsp;
                    <div className="row justify-content-center">
                        <div className="card col-md-8" style={{ background: "#bcbdbe", color: "#000" }}>
                            <div className="card-body">
                                <div style={{ height: "70px", display: "flex", alignItems: "center" }}>
                                    <Link to="/jugadores" className="btn btn-secondary" style={{ background: "#6C757D", color: "#fff" }}>
                                        Volver
                                    </Link>
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <Link
                                        to={`/updateJugador/${jugador.idJugador}`}
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
                                    {Object.keys(jugador).map((key) => (
                                        <div className="form-group row mb-2" key={key}>
                                            <label className="col-sm-3 col-form-label" style={{ color: "#000" }}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                                            <div className="col-sm-9">
                                                {key === 'fechaNacimiento' ? (
                                                    <DatePicker
                                                        className="form-control"
                                                        selected={jugador.fechaNacimiento}
                                                        disabled
                                                    />
                                                ) : key === 'genero' ? (
                                                    <select
                                                        className="form-control"
                                                        name={key}
                                                        value={jugador.genero || ''}
                                                        disabled
                                                    >
                                                        <option value="">Seleccione género</option>
                                                        <option value="M">Masculino</option>
                                                        <option value="F">Femenino</option>
                                                    </select>
                                                ) : (
                                                    <input
                                                        placeholder={key}
                                                        name={key}
                                                        className="form-control"
                                                        value={jugador[key]}
                                                        readOnly
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </form>
                            </div>
                        </div>
                    </div>
                    &nbsp;
                    <div></div>
                    &nbsp;
                    <div></div>
                    &nbsp;
                    <div className="form-group mb-2" style={{ display: 'flex', gap: '20px' }}>
                        <label style={{ color: '#ffffff' }}>Partido:</label>
                        <select
                            className="form-control"
                            onChange={(e) => setSelectedPartidoId(e.target.value)}
                            value={selectedPartidoId}
                            style={{ background: '#e6e5e5', color: '#151414', marginRight: '20px' }}
                        >
                            <option value="">Todos los partidos</option>
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
                            style={{ backgroundColor: '#F4B205', color: '#000', marginTop: '10px', width: '150px', height: '40px', fontSize: '14px' }}
                        >
                            Generar Gráficos
                        </Button>
                    </div>
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

export default PerfilJugador;
