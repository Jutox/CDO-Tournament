import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PartidoService from '../services/PartidoService';
import SetPartidoService from '../services/SetPartidoService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddSetPartidoFormTest = () => {
    const [setPartido, setSetPartido] = useState({
        numeroSet: 1,
        horaInicio: null,
        horaTermino: null,
        puntajeA: 0,
        puntajeB: 0,
        partido: null,
    });

    const [partidos, setPartidos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Obtener la lista de partidos desde tu servicio
        PartidoService.getPartidos()
            .then((response) => {
                setPartidos(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const saveSetPartido = (e) => {
        e.preventDefault();

        // Llama al servicio para guardar el SetPartido
        SetPartidoService.createSetPartido(setPartido)
            .then((response) => {
                console.log(setPartido);
                console.log(response.data);
                navigate('/setsPartido');
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

    const handlePartidoChange = (e) => {
        const partidoId = e.target.value;
        const selectedPartido = partidos.find((partido) => partido.idPartido === parseInt(partidoId));
        setSetPartido({ ...setPartido, partido: selectedPartido });
        console.log(selectedPartido)
    };

    return (
        <div style={{ background: "#202124", color: "#000", minHeight: "100vh" , paddingTop: '80px'}}>
            <div className="container" style={{ padding: '20px' }}>
                <h2 className="text-center" style={{ color: '#ffffff' }}>
                    Crear Set de Partido
                </h2>
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
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Partido:</label>
                                    <select
                                        name="partido"
                                        value={setPartido.partido ? setPartido.partido.idPartido : ''}
                                        onChange={handlePartidoChange}
                                        className="form-control"
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
                                <button
                                    onClick={saveSetPartido}
                                    className="btn btn-success"
                                    style={{ background: '#F4B205', color: '#fff' }}
                                >
                                    Guardar Set de Partido
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSetPartidoFormTest;
