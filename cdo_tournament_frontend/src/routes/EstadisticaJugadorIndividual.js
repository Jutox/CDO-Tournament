import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import JugadorService from '../services/JugadorService';
import PartidoService from '../services/PartidoService';
import EventoService from '../services/EventosService';

const EstadisticaJugadorIndividual = () => {
    const [jugadores, setJugadores] = useState([]);
    const [partidos, setPartidos] = useState([]);
    const [selectedJugadorId, setSelectedJugadorId] = useState('');
    const [selectedPartidoId, setSelectedPartidoId] = useState('');
    const [ataquesExitosos, setAtaquesExitosos] = useState(0);
    const [ataquesFallidos, setAtaquesFallidos] = useState(0);
    const [saquesExitosos, setSaquesExitosos] = useState(0);
    const [saquesFallidos, setSaquesFallidos] = useState(0);

    const ataquesChartRef = useRef(null);
    const saquesChartRef = useRef(null);

    useEffect(() => {
        // Fetch jugador statistics
        JugadorService.getJugadores()
            .then((response) => {
                const jugadoresData = response.data;
                setJugadores(jugadoresData);
            })
            .catch((error) => {
                console.error('Error fetching jugador statistics:', error);
            });

        // Fetch partidos data
        PartidoService.getPartidos()
            .then((partidosResponse) => {
                const partidosData = partidosResponse.data;
                setPartidos(partidosData);
            })
            .catch((partidosError) => {
                console.error('Error fetching partidos:', partidosError);
            });
    }, []);

    const handleGenerateChart = () => {
        // Verifica si se ha seleccionado un jugador y un partido antes de hacer la consulta
        if (!selectedJugadorId || !selectedPartidoId) {
            return;
        }

        // Obtener el total de ataques exitosos
        EventoService.getAtaquesExitososByIdJugadorIdPartido(selectedJugadorId, selectedPartidoId)
            .then((response) => {
                const totalExitosos = response.data.reduce((total, evento) => total + evento.puntos, 0);
                setAtaquesExitosos(totalExitosos);
            })
            .catch((error) => {
                console.error('Error fetching ataques exitosos:', error);
            });

        // Obtener el total de ataques fallidos
        EventoService.getAtaquesFallidosByIdJugadorIdPartido(selectedJugadorId, selectedPartidoId)
            .then((response) => {
                const totalFallidos = response.data.reduce((total, evento) => total + evento.puntos, 0);
                setAtaquesFallidos(totalFallidos);
            })
            .catch((error) => {
                console.error('Error fetching ataques fallidos:', error);
            });

        // Obtener el total de saques exitosos
        EventoService.getSaquesExitososByIdJugadorIdPartido(selectedJugadorId, selectedPartidoId)
            .then((response) => {
                const totalExitosos = response.data.reduce((total, evento) => total + evento.puntos, 0);
                setSaquesExitosos(totalExitosos);
            })
            .catch((error) => {
                console.error('Error fetching saques exitosos:', error);
            });

        // Obtener el total de saques fallidos
        EventoService.getSaquesFallidosByIdJugadorIdPartido(selectedJugadorId, selectedPartidoId)
            .then((response) => {
                const totalFallidos = response.data.reduce((total, evento) => total + evento.puntos, 0);
                setSaquesFallidos(totalFallidos);
            })
            .catch((error) => {
                console.error('Error fetching saques fallidos:', error);
            });
    };

    useEffect(() => {
        createOrUpdateCharts();
    }, [ataquesExitosos, ataquesFallidos, saquesExitosos, saquesFallidos]);

    const createOrUpdateCharts = () => {
        // Configura el gráfico de torta para ataques
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

        // Configura el gráfico de torta para saques
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
        <div style={{ background: '#d4d1d0', color: '#000', minHeight: '93vh' }}>
            <div className="container" style={{ padding: '20px' }}>
                <h2 className="text-center">Estadísticas de Jugador</h2>
                <div className="row justify-content-center">
                    <Form>
                        <div className="form-group mb-2">
                            <label style={{ color: '#000' }}>Jugador:</label>
                            <select
                                className="form-control"
                                onChange={(e) => setSelectedJugadorId(e.target.value)}
                                value={selectedJugadorId}
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
                            <label style={{ color: '#000' }}>Partido:</label>
                            <select
                                className="form-control"
                                onChange={(e) => setSelectedPartidoId(e.target.value)}
                                value={selectedPartidoId}
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
                    </Form>
                    <div className="row justify-content-start">
                        <Button
                            variant="primary"
                            onClick={handleGenerateChart}
                            style={{ backgroundColor: '#F4B205', color: '#000', marginTop: '10px', width: '150px', height: '40px', fontSize: '14px' }}
                        >
                            Generar Gráficos
                        </Button>
                    </div>
                </div>
                &nbsp;
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h3 className="text-center">Estadísticas de Ataques</h3>
                        <h5 className="text-center">Aqui se puede visualizar los Ataques Exitosos VS los Ataques Fallidos</h5>
                        <canvas id="grafico-ataques" width="300" height="150"></canvas>
                    </div>
                    <div className="col-md-6">
                        <h3 className="text-center">Estadísticas de Saques</h3>
                        <h5 className="text-center">Aqui se puede visualizar los Saques Exitosos VS los Saques Fallidos</h5>
                        <canvas id="grafico-saques" width="300" height="150"></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstadisticaJugadorIndividual;
