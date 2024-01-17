import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EquipoService from '../services/EquipoService';

const ActualizarEquipoForm = () => {
    const { id } = useParams();
    const [equipo, setEquipo] = useState({
        nombreEquipo: '',
        nombreEntrenador: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the tournament data when the component mounts
        EquipoService.getEquipoById(id)
            .then((response) => {
                setEquipo({
                    ...response.data,
                });
            })
            .catch((error) => {
                console.error('Error fetching tournament data:', error);
            });
    }, [id]);

    const updateEquipo = () => {
        // Send a PUT request to update the tournament information
        EquipoService.updateEquipo(id, equipo)
            .then((response) => {
                console.log(response.data);
                navigate(`/equipos`);
            })
            .catch((error) => {
                console.error('Error updating equipo:', error);
                alert('Hubo un error al actualizar el Equipo. Por favor, inténtalo nuevamente.');
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEquipo({ ...equipo, [name]: value });
    };

    return (
        <div style={{ background: '#202124', color: '#000', minHeight: '100vh', padding: '20px' , paddingTop: '80px' }}>
            &nbsp;
            <h2 className="text-center" style={{ color: '#ffffff' }}>
                Actualizar Equipo
            </h2>
            &nbsp;
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{ background: '#bcbdbe', color: '#000' }}>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Nombre Equipo:</label>
                                    <input
                                        type="nombreEquipo"
                                        name="nombreEquipo"
                                        value={equipo.nombreEquipo}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Nombre Entrenador:</label>
                                    <input
                                        type="nombreEntrenador"
                                        name="nombreEntrenador"
                                        value={equipo.nombreEntrenador}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>

                                <button
                                    to={`/perfilEquipo/${id}`}
                                    onClick={updateEquipo}
                                    className="btn btn-success"
                                    style={{ backgroundColor: '#F4B205', color: '#000' }}
                                >
                                    Actualizar Equipo
                                </button>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <Link
                                    to={`/perfilEquipo/${id}`}
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

export default ActualizarEquipoForm;
