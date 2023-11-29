import React, { useState } from 'react';
import AddEventoForm from './AddEventoForm'; // Asegúrate de que la ruta sea la correcta

const TableroPuntos = () => {
    const [puntajeEquipo1, setPuntajeEquipo1] = useState(0);
    const [puntajeEquipo2, setPuntajeEquipo2] = useState(0);

    const aumentarPuntajeEquipo1 = () => {
        setPuntajeEquipo1(puntajeEquipo1 + 1);
    };

    const disminuirPuntajeEquipo1 = () => {
        if (puntajeEquipo1 > 0) {
            setPuntajeEquipo1(puntajeEquipo1 - 1);
        }
    };

    const aumentarPuntajeEquipo2 = () => {
        setPuntajeEquipo2(puntajeEquipo2 + 1);
    };

    const disminuirPuntajeEquipo2 = () => {
        if (puntajeEquipo2 > 0) {
            setPuntajeEquipo2(puntajeEquipo2 - 1);
        }
    };

    return (
        <div style={{ background: "#d4d1d0", color: "#000", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="container">
                <h2 className="text-center">Tablero de Puntos</h2>
                &nbsp;
                <div className="row justify-content-center">
                    <div className="col-md-3">
                        <div className="card" style={{ background: "#bcbdbe", width: "600px", margin: "0 -300px" }}>
                            <div className="card-body">
                                <h3 className="text-center">Equipo 1</h3>
                                <div className="text-center" style={{ fontSize: "348px" }}>{puntajeEquipo1}</div>
                                <div className="text-center">
                                    <button
                                        className="btn btn-primary m-2"
                                        onClick={aumentarPuntajeEquipo1}
                                    >
                                        Aumentar Punto
                                    </button>
                                    <button
                                        className="btn btn-warning m-2"
                                        onClick={disminuirPuntajeEquipo1}
                                    >
                                        Disminuir Punto
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card" style={{ background: "#bcbdbe", border: "none" }}>
                            <div >
                                {/* Aquí va el formulario de eventos */}
                                <AddEventoForm />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card" style={{ background: "#bcbdbe", width: "600px", margin: "0 10px" }}>
                            <div className="card-body">
                                <h3 className="text-center">Equipo 2</h3>
                                <div className="text-center" style={{ fontSize: "348px" }}>{puntajeEquipo2}</div>
                                <div className="text-center">
                                    <button
                                        className="btn btn-primary m-2"
                                        onClick={aumentarPuntajeEquipo2}
                                    >
                                        Aumentar Punto
                                    </button>
                                    <button
                                        className="btn btn-warning m-2"
                                        onClick={disminuirPuntajeEquipo2}
                                    >
                                        Disminuir Punto
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableroPuntos;
