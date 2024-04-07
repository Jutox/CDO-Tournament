import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import jsPDF from 'jspdf'; // Importa la librería para generar PDF
import JugadorService from '../services/JugadorService';
import eventoService from '../services/EventosService';
import PartidoService from '../services/PartidoService';
import TorneoService from '../services/TorneoService';
import {Button} from "react-bootstrap";
import EventoService from "../services/EventosService";
import Chart from 'chart.js/auto';
import * as IoIcons from "react-icons/io";

export const PerfilJugador = () => {
    const { id } = useParams();
    const [jugadorId, setJugadorId] = useState();
    const [partidos, setPartidos] = useState([]);
    const [torneos, setTorneos] = useState([]);
    const [selectedPartidoId, setSelectedPartidoId] = useState('');
    const [selectedTorneoId, setSelectedTorneoId] = useState('');

    const [selectedPartido, setSelectedPartido] = useState('');
    const [selectedTorneo, setSelectedTorneo] = useState('');

    const [puntosFavor, setPuntosFavor] = useState(0);
    const [puntosContra, setPuntosContra] = useState(0);

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

        PartidoService.getPartidoById(selectedPartidoId)
            .then((partidosResponse) => {
                const partidosData = partidosResponse.data;
                setPartidos(partidosData);
            })
            .catch((partidosError) => {
                console.error('Error fetching partidos:', partidosError);
            });
    }, [id]);

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


    // Función para exportar a PDF
    const exportToPDF = () => {
        const doc = new jsPDF();

        // Cambiar el estilo de fuente y tamaño
        doc.setFont("helvetica");
        doc.setFontSize(14);

        // Agregar una línea debajo del título
        doc.setTextColor(0, 0, 0); // Color negro
        doc.setFontSize(24);
        doc.text("Reporte " + jugador.nombres, 10, 20);

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
        doc.text("Nombres: " + jugador.nombres, 10, yPosition += 7);
        doc.text("Apellido Paterno: " + jugador.apellidoPaterno, 10, yPosition += 7);
        doc.text("Apellido Materno: " + jugador.apellidoMaterno, 10, yPosition += 7);
        doc.text("RUT: " + formatRUT(jugador.rut), 10, yPosition += 7);
        doc.text("Fecha de Nacimiento: " + (jugador.fechaNacimiento ? jugador.fechaNacimiento.toLocaleDateString() : ''), 10, yPosition += 7);
        doc.text("Género: " + jugador.genero, 10, yPosition += 7);
        doc.text("Teléfono: " + jugador.telefono, 10, yPosition += 7);
        doc.text("Email: " + jugador.email, 10, yPosition += 7);
        doc.text("Estatura (cm.): " + jugador.estatura, 10, yPosition += 7);
        doc.text("Peso (Kg.): " + jugador.peso, 10, yPosition += 7);
        doc.text("Alcance de Mano (cm.): " + jugador.alcanceMano, 10, yPosition += 7);
        doc.text("Alcance de Bloqueo (cm.): " + jugador.alcanceBloqueo, 10, yPosition += 7);

        // Agregar una línea divisoria entre secciones
        doc.setLineWidth(0.2);
        doc.line(10, yPosition += 7, 200, yPosition); // Línea después de la información del jugador

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

        const currentDateTime = new Date().toLocaleString();

        // Agregar la fecha y la hora en la esquina inferior izquierda
        doc.setTextColor(0, 0, 0); // Color negro
        doc.setFontSize(10); // Tamaño de fuente más pequeño para la fecha y la hora
        doc.text("Reporte Generado el: "+ currentDateTime, 10, doc.internal.pageSize.height - 10);

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


        EventoService.getAtaquesExitososByIdJugador(jugadorId)
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

        EventoService.getAtaquesFallidosByIdJugador(jugadorId)
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
        EventoService.getSaquesExitososByIdJugador(jugadorId)
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

        EventoService.getSaquesFallidosByIdJugador(jugadorId)
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

        eventoService.getBloqueosExitososByIdJugador(jugadorId)
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

        eventoService.getAdvertenciasByIdJugador(jugadorId)
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

        eventoService.getDescalificacionesByIdJugador(jugadorId)
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

        eventoService.getPenalizacionesByIdJugador(jugadorId)
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

        // Calcular los porcentajes para ataques
        const totalAtaques = ataquesExitosos + Math.abs(ataquesFallidos);
        const porcentajeExitososAtaques = ((ataquesExitosos / totalAtaques) * 100).toFixed(2);
        const porcentajeFallidosAtaques = ((Math.abs(ataquesFallidos) / totalAtaques) * 100).toFixed(2);

        ataquesChartRef.current = new Chart(ataquesCtx, {
            type: 'pie',
            data: {
                labels: ['Ataques Exitosos ' + porcentajeExitososAtaques + '%', 'Ataques Fallidos ' + porcentajeFallidosAtaques + '%'],
                datasets: [
                    {
                        data: [ataquesExitosos, ataquesFallidos*-1],
                        backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                    },
                ],
            },
        });

        if (saquesChartRef.current) {
            saquesChartRef.current.destroy();
        }
        const saquesCtx = document.getElementById('grafico-saques').getContext('2d');

        // Calcular los porcentajes para saques
        const totalSaques = saquesExitosos + Math.abs(saquesFallidos);
        const porcentajeExitososSaques = ((saquesExitosos / totalSaques) * 100).toFixed(2);
        const porcentajeFallidosSaques = ((Math.abs(saquesFallidos) / totalSaques) * 100).toFixed(2);

        saquesChartRef.current = new Chart(saquesCtx, {
            type: 'pie',
            data: {
                labels: ['Saques Exitosos ' + porcentajeExitososSaques + '%', 'Saques Fallidos ' + porcentajeFallidosSaques + '%'],
                datasets: [
                    {
                        data: [saquesExitosos, saquesFallidos*-1],
                        backgroundColor: ['rgba(255, 205, 86, 1)', 'rgba(54, 162, 235, 1)'],
                    },
                ],
            },
        });
    };

    const formatRUT = (rut) => {
        // Remove any dots or dashes in the input RUT
        const cleanRUT = rut.replace(/[.-]/g, '');

        // Split the clean RUT into the main part and the verifier digit
        const mainPart = cleanRUT.slice(0, -1);
        const verifierDigit = cleanRUT.slice(-1);

        // Add dots for formatting
        const formattedRUT = mainPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + verifierDigit;

        return formattedRUT;
    };

    return (
        <div>
            <div style={{ background: '#202124', color: '#000', minHeight: '100vh', padding: '20px' , paddingTop: '80px' }}>
                &nbsp;
                <h1 className="text-left" style={{color: '#F4B205'}}>
                    CDO Tournament
                </h1>
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
                                    <div className="form-group row mb-2">
                                        <label className="col-sm-3 col-form-label" style={{ color: "#000" }}>Nombres:</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="nombres"
                                                className="form-control"
                                                value={jugador.nombres}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <label className="col-sm-3 col-form-label" style={{ color: "#000" }}>Apellido Paterno:</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="apellidoPaterno"
                                                className="form-control"
                                                value={jugador.apellidoPaterno}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <label className="col-sm-3 col-form-label" style={{ color: "#000" }}>Apellido Materno:</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="apellidoMaterno"
                                                className="form-control"
                                                value={jugador.apellidoMaterno}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <label className="col-sm-3 col-form-label" style={{ color: "#000" }}>RUT:</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="rut"
                                                className="form-control"
                                                value={formatRUT(jugador.rut)}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <label className="col-sm-3 col-form-label" style={{ color: "#000" }}>Fecha de Nacimiento:</label>
                                        <div className="col-sm-9">
                                            <DatePicker
                                                className="form-control"
                                                selected={jugador.fechaNacimiento}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <label className="col-sm-3 col-form-label" style={{ color: "#000" }}>Género:</label>
                                        <div className="col-sm-9">
                                            <select
                                                className="form-control"
                                                name="genero"
                                                value={jugador.genero || ''}
                                                disabled
                                            >
                                                <option value="">Seleccione género</option>
                                                <option value="M">Masculino</option>
                                                <option value="F">Femenino</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <label className="col-sm-3 col-form-label" style={{ color: "#000" }}>Teléfono:</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="telefono"
                                                className="form-control"
                                                value={jugador.telefono}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <label className="col-sm-3 col-form-label" style={{ color: "#000" }}>Email:</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="email"
                                                className="form-control"
                                                value={jugador.email}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <label className="col-sm-3 col-form-label" style={{ color: "#000" }}>Estatura (cm.):</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="estatura"
                                                className="form-control"
                                                value={jugador.estatura}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <label className="col-sm-3 col-form-label" style={{ color: "#000" }}>Peso (Kg.):</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="peso"
                                                className="form-control"
                                                value={jugador.peso}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <label className="col-sm-3 col-form-label" style={{ color: "#000" }}>Alcance de Mano (cm.):</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="alcanceMano"
                                                className="form-control"
                                                value={jugador.alcanceMano}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <label className="col-sm-3 col-form-label" style={{ color: "#000" }}>Alcance de Bloqueo (cm.):</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="alcanceBloqueo"
                                                className="form-control"
                                                value={jugador.alcanceBloqueo}
                                                readOnly
                                            />
                                        </div>
                                    </div>
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
                            style={{ backgroundColor: '#F4B205', color: '#000', marginTop: '10px', width: '210px', height: '40px', fontSize: '16px' }}
                        >
                            Generar Estadísticas <IoIcons.IoIosStats />
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
                                    <h5 className="text-center">Aquí se puede visualizar los Ataques Exitosos VS los Ataques Fallidos</h5>
                                    <canvas id="grafico-ataques" width="300" height="150"></canvas>
                                </div>
                                <div className="col-md-6" style={{ color: '#ffffff' }}>
                                    <h3 className="text-center">Estadísticas de Saques</h3>
                                    <h5 className="text-center">Aquí se puede visualizar los Saques Exitosos VS los Saques Fallidos</h5>
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
