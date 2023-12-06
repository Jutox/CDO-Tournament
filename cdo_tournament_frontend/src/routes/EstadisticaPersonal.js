import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import JugadorService from '../services/JugadorService';
import PartidoService from '../services/PartidoService';
import EventoService from '../services/EventosService';

const EstadisticaPersonal = ({ jugadorId, partidoId }) => {
    const [ataquesExitosos, setAtaquesExitosos] = useState(0);
    const [ataquesFallidos, setAtaquesFallidos] = useState(0);
    const [saquesExitosos, setSaquesExitosos] = useState(0);
    const [saquesFallidos, setSaquesFallidos] = useState(0);

    const ataquesChartRef = useRef(null);
    const saquesChartRef = useRef(null);

    useEffect(() => {

            fetchJugadorStatistics(jugadorId);
            console.log(jugadorId)

    }, [jugadorId]);

    const fetchJugadorStatistics = (id) => {
        console.log("jugador: ",jugadorId, "partido: ", partidoId);

        if(partidoId === ''){

            // Obtener el total de ataques exitosos
            EventoService.getAtaquesExitososByIdJugador(jugadorId)
                .then((response) => {
                    const totalExitosos = response.data.reduce((total, evento) => total + evento.puntos, 0);
                    setAtaquesExitosos(totalExitosos);
                })
                .catch((error) => {
                    console.error('Error fetching ataques exitosos:', error);
                });

            // Obtener el total de ataques fallidos
            EventoService.getAtaquesFallidosByIdJugador(jugadorId)
                .then((response) => {
                    const totalFallidos = response.data.reduce((total, evento) => total + evento.puntos, 0);
                    setAtaquesFallidos(totalFallidos);
                })
                .catch((error) => {
                    console.error('Error fetching ataques fallidos:', error);
                });

            // Obtener el total de saques exitosos
            EventoService.getSaquesExitososByIdJugador(jugadorId)
                .then((response) => {
                    const totalExitosos = response.data.reduce((total, evento) => total + evento.puntos, 0);
                    setSaquesExitosos(totalExitosos);
                })
                .catch((error) => {
                    console.error('Error fetching saques exitosos:', error);
                });

            // Obtener el total de saques fallidos
            EventoService.getSaquesFallidosByIdJugador(jugadorId)
                .then((response) => {
                    const totalFallidos = response.data.reduce((total, evento) => total + evento.puntos, 0);
                    setSaquesFallidos(totalFallidos);
                })
                .catch((error) => {
                    console.error('Error fetching saques fallidos:', error);
                });
        }else {
            EventoService.getAtaquesExitososByIdJugadorIdPartido(jugadorId, partidoId)
                .then((response) => {
                    const totalExitosos = response.data.reduce((total, evento) => total + evento.puntos, 0);
                    setAtaquesExitosos(totalExitosos);
                })
                .catch((error) => {
                    console.error('Error fetching ataques exitosos:', error);
                });

            EventoService.getAtaquesFallidosByIdJugadorIdPartido(jugadorId, partidoId)
                .then((response) => {
                    const totalExitosos = response.data.reduce((total, evento) => total + evento.puntos, 0);
                    setAtaquesExitosos(totalExitosos);
                })
                .catch((error) => {
                    console.error('Error fetching ataques exitosos:', error);
                });
        }
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

export default EstadisticaPersonal;
