import React, { useState, useEffect } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PartidoService from '../services/PartidoService';
import SetPartidoService from '../services/SetPartidoService';

const ActualizarSetPartido = () => {
    const { partidoId, setId } = useParams();
    const [setPartido, setSetPartido] = useState({
        numeroSet: 1,
        horaInicio: null,
        horaTermino: null,
        puntajeA: 0,
        puntajeB: 0,
        partido: null,
    });

    const navigate = useNavigate();

    useEffect(() => {

        PartidoService.getPartidoById(partidoId)
            .then((response) => {
                setSetPartido({ ...setPartido, partido: response.data });
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        SetPartidoService.getSetPartidoById(setId)
            .then((response) => {
                const setPartidoData = response.data;

                // Convert time values to JavaScript Date objects if they exist
                const horaInicio = setPartidoData.horaInicio ? new Date(setPartidoData.horaInicio) : null;
                const horaTermino = setPartidoData.horaTermino ? new Date(setPartidoData.horaTermino) : null;

                setSetPartido({
                    ...setPartidoData,
                    horaInicio, // Update horaInicio with the converted value
                    horaTermino, // Update horaTermino with the converted value
                });
            })
            .catch((error) => {
                console.error('Error fetching set data:', error);
            });

    }, [partidoId, setId]);

    const saveSetPartido = (e) => {
        e.preventDefault();


        // Llama al servicio para guardar el SetPartido
        SetPartidoService.createSetPartido(setPartido)
            .then((response) => {
                console.log(setPartido);
                console.log(response.data);
                navigate(`/perfilPartido/${partidoId}`);
            })
            .catch((error) => {
                console.error('Error creating SetPartido:', error);
                alert('Hubo un error al crear el SetPartido. Por favor, inténtalo nuevamente.');
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSetPartido({ ...setPartido, [name]: value });
    };

    const handleHourChange = (date, field) => {
        // Verificar si la fecha es válida
        if (!(date instanceof Date) || isNaN(date) || !isFinite(date)) {
            console.error("Fecha no válida");
            return;
        }

        // Verificar si la hora es válida
        if (isNaN(date.getHours()) || isNaN(date.getMinutes()) || isNaN(date.getSeconds())) {
            console.error("Hora no válida");
            return;
        }

        // Diferenciar entre horaInicio y horaTermino
        if (field === 'horaInicio') {
            setSetPartido({ ...setPartido, horaInicio: date });
        } else if (field === 'horaTermino') {
            setSetPartido({ ...setPartido, horaTermino: date });
        }
    };



    return (
        <div style={{ background: "#202124", color: "#000", minHeight: "93vh" }}>
            <div className="container" style={{ padding: '20px' }}>
                &nbsp;
                <h2 className="text-center" style={{ color: '#ffffff' }}>
                    Crear Set de Partido
                </h2>
                &nbsp;
                <div className="row justify-content-center">
                    <div className="card col-md-8" style={{ background: '#bcbdbe', color: '#000' }}>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Número de Set:</label>
                                    <input
                                        type="number"
                                        name="numeroSet"
                                        value={setPartido.numeroSet}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Hora de Inicio:</label>
                                    <DatePicker
                                        className="form-control"
                                        selected={setPartido.horaInicio}
                                        onChange={(date) => handleHourChange(date, 'horaInicio')}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Hora"
                                        dateFormat="h:mm aa"
                                        placeholderText="Selecciona hora"
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Hora de Término:</label>
                                    <DatePicker
                                        className="form-control"
                                        selected={setPartido.horaTermino}
                                        onChange={(date) => handleHourChange(date, 'horaTermino')}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Hora"
                                        dateFormat="h:mm aa"
                                        placeholderText="Selecciona hora"
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Puntaje A:</label>
                                    <input
                                        type="number"
                                        name="puntajeA"
                                        value={setPartido.puntajeA}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Puntaje B:</label>
                                    <input
                                        type="number"
                                        name="puntajeB"
                                        value={setPartido.puntajeB}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>

                                <button
                                    onClick={saveSetPartido}
                                    className="btn btn-success"
                                    style={{ backgroundColor: '#F4B205', color: '#000' }}
                                >
                                    Guardar Set de Partido
                                </button>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <Link
                                    to={`/perfilPartido/${partidoId}`}
                                    className="btn btn-secondary"
                                    style={{ background: "#6C757D", color: "#fff" }}
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

export default ActualizarSetPartido;
