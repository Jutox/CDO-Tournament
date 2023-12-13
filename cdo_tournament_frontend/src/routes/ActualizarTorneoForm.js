import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TorneoService from '../services/TorneoService';

const ActualizarTorneoForm = () => {
    const { id } = useParams();
    const [torneo, setTorneo] = useState({
        nombre: '',
        fechaInicio: null,
        fechaTermino: null,
        lugar: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the tournament data when the component mounts
        TorneoService.getTorneoById(id)
            .then((response) => {
                setTorneo({
                    ...response.data,
                    fechaInicio: response.data.fechaInicio ? new Date(response.data.fechaInicio) : null,
                    fechaTermino: response.data.fechaTermino ? new Date(response.data.fechaTermino) : null,
                });
            })
            .catch((error) => {
                console.error('Error fetching tournament data:', error);
            });
    }, [id]);

    const updateTorneo = () => {
        // Send a PUT request to update the tournament information
        TorneoService.updateTorneo(id, torneo)
            .then((response) => {
                console.log(response.data);
                navigate(`/torneos`);
            })
            .catch((error) => {
                console.error('Error updating tournament:', error);
                alert('Hubo un error al actualizar el Torneo. Por favor, inténtalo nuevamente.');
            });
    };

    const handleDateChange = (date, fieldName) => {
        setTorneo({ ...torneo, [fieldName]: date });
    };

    return (
        <div style={{ background: '#202124', color: '#000', minHeight: '93vh', padding: '20px' }}>
            <h2 className="text-center" style={{ color: '#ffffff' }}>
                Actualizar Torneo
            </h2>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{ background: '#bcbdbe', color: '#000' }}>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Nombre:</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={torneo.nombre}
                                        onChange={(e) => setTorneo({ ...torneo, nombre: e.target.value })}
                                        className="form-control"
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Fecha de Inicio:</label>
                                    <div className="col-sm-9">
                                        <DatePicker
                                            className="form-control"
                                            selected={torneo.fechaInicio}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Fecha de Inicio"
                                            onChange={(date) => handleDateChange(date, 'fechaInicio')}
                                        />
                                    </div>
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Fecha de Término:</label>
                                    <div className="col-sm-9">
                                        <DatePicker
                                            className="form-control"
                                            selected={torneo.fechaTermino}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Fecha de Término"
                                            onChange={(date) => handleDateChange(date, 'fechaTermino')}
                                        />
                                    </div>
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Lugar:</label>
                                    <input
                                        type="text"
                                        name="lugar"
                                        value={torneo.lugar}
                                        onChange={(e) => setTorneo({ ...torneo, lugar: e.target.value })}
                                        className="form-control"
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>

                                <button
                                    onClick={updateTorneo}
                                    className="btn btn-success"
                                    style={{ backgroundColor: '#F4B205', color: '#000' }}
                                >
                                    Actualizar Torneo
                                </button>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <Link
                                    to={`/perfilTorneo/${id}`}
                                    className="btn btn-secondary"
                                    style={{ background: '#6C757D', color: '#fff' }}
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

export default ActualizarTorneoForm;
