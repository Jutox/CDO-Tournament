import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import JugadorService from '../services/JugadorService';

export const ActualizarJugadorForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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
            })
            .catch((error) => {
                console.log(error);
                // Handle error
            });
    }, [id]);

    const updateJugador = (e) => {
        e.preventDefault();

        // Validate fields as needed
        if (!jugador.nombres || !jugador.apellidoPaterno || !jugador.fechaNacimiento || !jugador.genero) {
            alert('Todos los campos obligatorios deben ser llenados. Por favor, completa el formulario.');
            return;
        }

        // Update jugador
        JugadorService.updateJugador(id, jugador)
            .then((response) => {
                console.log(response.data);
                navigate('/jugadores');
            })
            .catch((error) => {
                console.log(error);
                alert('La actualización de datos tuvo un error. Por favor, intenta nuevamente.');
            });
    };

    const deleteJugador = () => {
        // Delete jugador
        JugadorService.deleteJugador(id)
            .then(() => {
                // After successful deletion, navigate to '/jugadores'
                navigate('/jugadores');
            })
            .catch((error) => {
                console.log(error);
                alert('Error al eliminar el jugador. Por favor, intenta nuevamente.');
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJugador({ ...jugador, [name]: value });
    };

    const handleDateChange = (date) => {
        setJugador({ ...jugador, fechaNacimiento: date });
    };

    const handleGenderChange = (e) => {
        setJugador({ ...jugador, genero: e.target.value });
    };

    return (
        <div style={{ background: "#d4d1d0", color: "#000", minHeight: "93vh" }}>
            <div className="container" style={{ padding: "20px" }}>
                <h2 className="text-center" style={{ color: "#000" }}>Actualizar Jugador</h2>
                <div className="row justify-content-center">
                    <div className="card col-md-8" style={{ background: "#bcbdbe", color: "#000" }}>
                        <div className="card-body">
                            <form>
                                {Object.keys(jugador).map((key) => (
                                    <div className="form-group mb-2" key={key}>
                                        <label style={{ color: "#000" }}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                                        {key === 'fechaNacimiento' ? (
                                            <div>
                                                <DatePicker
                                                    className="form-control"
                                                    selected={jugador.fechaNacimiento}
                                                    onChange={handleDateChange}
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Selecciona fecha"
                                                    style={{ background: "#e6e5e5", color: "#151414" }}
                                                />
                                            </div>
                                        ) : key === 'genero' ? (
                                            <select
                                                className="form-control"
                                                name={key}
                                                value={jugador.genero || ''}
                                                onChange={handleGenderChange}
                                                style={{ background: "#e6e5e5", color: "#151414" }}
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
                                                onChange={handleInputChange}
                                                style={{ background: "#e6e5e5", color: "#151414" }}
                                            />
                                        )}
                                    </div>
                                ))}

                                <button className="btn btn-success" onClick={updateJugador} style={{ background: "#F4B205", color: "#fff" }}>
                                    Actualizar
                                </button>
                                &nbsp;&nbsp;&nbsp;
                                <button className="btn btn-danger" onClick={deleteJugador} style={{ background: "#dc3545", color: "#fff" }}>
                                    Eliminar
                                </button>
                                &nbsp;&nbsp;&nbsp;
                                <Link to="/jugadores" className="btn btn-secondary" style={{ background: "#6C757D", color: "#fff" }}>
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

export default ActualizarJugadorForm;