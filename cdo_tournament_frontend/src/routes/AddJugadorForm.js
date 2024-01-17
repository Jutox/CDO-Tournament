import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import JugadorService from '../services/JugadorService';

export const AddJugadorForm = () => {
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

    const navigate = useNavigate();

    const saveJugador = (e) => {
        e.preventDefault();

        if (!jugador.nombres || !jugador.apellidoPaterno || !jugador.fechaNacimiento || !jugador.genero) {
            alert('Todos los campos obligatorios deben ser llenados. Por favor, completa el formulario.');
            return;
        }

        JugadorService.createJugador(jugador)
            .then((response) => {
                console.log(response.data);
                navigate('/jugadores');
            })
            .catch((error) => {
                console.log(error);
                alert('La captura de datos tuvo un error. Por favor, intenta nuevamente.');
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
        <div style={{ background: "#202124", color: "#000", minHeight: "100vh" , paddingTop: '80px'}}>
            <div className="container" style={{ padding: "20px" }}>
                &nbsp;
                <h2 className="text-center" style={{ color: "#ffffff" }}>Añadir Jugador</h2>
                &nbsp;
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

                                <button className="btn btn-success" onClick={saveJugador} style={{ background: "#F4B205", color: "#fff" }}>
                                    Guardar
                                </button>
                                &nbsp;&nbsp;&nbsp;
                                <Link to="/jugadores" className="btn btn-danger" style={{ background: "#dc3545", color: "#fff" }}>
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

export default AddJugadorForm;