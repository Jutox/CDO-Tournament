import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import JugadorService from '../services/JugadorService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './EstadisticaJugadores.css'; // Importa el archivo CSS

const EstadisticaJugadores = () => {
    const [estadisticas, setEstadisticas] = useState({
        promedioEstatura: 0,
        promedioPeso: 0,
        promedioAlcanceMano: 0,
        promedioAlcanceBloqueo: 0,
    });

    useEffect(() => {
        // Fetch jugador statistics
        JugadorService.getJugadores()
            .then((response) => {
                const jugadores = response.data;

                if (jugadores.length > 0) {
                    // Calculate averages
                    const promedioEstatura = calcularPromedio(jugadores, 'estatura');
                    const promedioPeso = calcularPromedio(jugadores, 'peso');
                    const promedioAlcanceMano = calcularPromedio(jugadores, 'alcanceMano');
                    const promedioAlcanceBloqueo = calcularPromedio(jugadores, 'alcanceBloqueo');

                    setEstadisticas({
                        promedioEstatura,
                        promedioPeso,
                        promedioAlcanceMano,
                        promedioAlcanceBloqueo,
                    });

                    // Create and update charts
                    crearGrafico('graficoEstatura', 'Promedio de Estatura', 'Estatura (cm)', jugadores, 'estatura');
                    crearGrafico('graficoPeso', 'Promedio de Peso', 'Peso (kg)', jugadores, 'peso');
                    crearGrafico('graficoAlcanceMano', 'Promedio de Alcance de Mano', 'Alcance de Mano (cm)', jugadores, 'alcanceMano');
                    crearGrafico('graficoAlcanceBloqueo', 'Promedio de Alcance de Bloqueo', 'Alcance de Bloqueo (cm)', jugadores, 'alcanceBloqueo');
                }
            })
            .catch((error) => {
                console.error('Error fetching jugador statistics:', error);
            });
    }, []);

    const calcularPromedio = (jugadores, atributo) => {
        const total = jugadores.reduce((sum, jugador) => sum + (jugador[atributo] || 0), 0);
        return jugadores.length > 0 ? total / jugadores.length : 0;
    };

    const crearGrafico = (id, titulo, etiqueta, jugadores, atributo) => {
        const ctx = document.getElementById(id);

        const data = {
            labels: jugadores.map((jugador) => jugador.nombres),
            datasets: [
                {
                    label: etiqueta,
                    data: jugadores.map((jugador) => jugador[atributo]),
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1,
                },
            ],
        };

        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: titulo,
                    },
                },
            },
        });
    };

    const exportarPDF = () => {
        const pdf = new jsPDF();

        const graficos = ['graficoEstatura', 'graficoPeso', 'graficoAlcanceMano', 'graficoAlcanceBloqueo'];
        graficos.forEach((id, index) => {
            const canvas = document.getElementById(id);
            const imageData = canvas.toDataURL('image/png');

            if (index !== 0) {
                pdf.addPage();
            }

            pdf.addImage(imageData, 'PNG', 10, 10, 190, 100);
        });

        pdf.save('estadisticas_jugadores.pdf');
    };

    return (
        <div style={{ background: "#d4d1d0", color: "#000", minHeight: "93vh" }}>
        <div className="container"> {/* Añade la clase container para centrar los gráficos */}
            <h2 className="text-center">Estadísticas de Jugadores</h2>
            <div className="row">
                <div className="col-md-6">
                    <canvas id="graficoEstatura" width="400" height="300"></canvas>
                </div>
                <div className="col-md-6">
                    <canvas id="graficoPeso" width="400" height="300"></canvas>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <canvas id="graficoAlcanceMano" width="400" height="300"></canvas>
                </div>
                <div className="col-md-6">
                    <canvas id="graficoAlcanceBloqueo" width="400" height="300"></canvas>
                </div>
            </div>
            <button className="btn btn-custom" onClick={exportarPDF}>
                Exportar a PDF
            </button>
        </div>
        </div>
    );
};

export default EstadisticaJugadores;