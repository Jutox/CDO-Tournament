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

        if (!jugador.nombres || !jugador.apellidoPaterno || !jugador.fechaNacimiento || !jugador.genero || !jugador.email || !jugador.rut || !jugador.fechaNacimiento) {
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
        <div style={{ background: '#202124', color: '#000', minHeight: '100vh', padding: '20px' , paddingTop: '80px' }}>
            &nbsp;
            <h1 className="text-left" style={{color: '#F4B205'}}>
                CDO Tournament
            </h1>
            &nbsp;
            <div className="container" style={{ padding: "20px" }}>
                &nbsp;
                <h2 className="text-center" style={{ color: "#ffffff" }}>Añadir Jugador</h2>
                &nbsp;
                <div className="row justify-content-center">
                    <div className="card col-md-8" style={{ background: "#bcbdbe", color: "#000" }}>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label style={{ color: "#000" }}>Nombres:*</label>
                                    <input
                                        placeholder="Nombres"
                                        name="nombres"
                                        className="form-control"
                                        value={jugador.nombres}
                                        onChange={handleInputChange}
                                        style={{ background: "#e6e5e5", color: "#151414" }}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: "#000" }}>Apellido Paterno:*</label>
                                    <input
                                        placeholder="Apellido Paterno"
                                        name="apellidoPaterno"
                                        className="form-control"
                                        value={jugador.apellidoPaterno}
                                        onChange={handleInputChange}
                                        style={{ background: "#e6e5e5", color: "#151414" }}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: "#000" }}>Apellido Materno:*</label>
                                    <input
                                        placeholder="Apellido Materno"
                                        name="apellidoMaterno"
                                        className="form-control"
                                        value={jugador.apellidoMaterno}
                                        onChange={handleInputChange}
                                        style={{ background: "#e6e5e5", color: "#151414" }}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: "#000" }}>RUT:</label>
                                    <input
                                        placeholder="RUT"
                                        name="rut"
                                        className="form-control"
                                        value={jugador.rut}
                                        onChange={handleInputChange}
                                        style={{ background: "#e6e5e5", color: "#151414" }}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: "#000" }}>Fecha de Nacimiento:*</label>
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
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: "#000" }}>Género:*</label>
                                    <select
                                        className="form-control"
                                        name="genero"
                                        value={jugador.genero || ''}
                                        onChange={handleGenderChange}
                                        style={{ background: "#e6e5e5", color: "#151414" }}
                                    >
                                        <option value="">Seleccione género</option>
                                        <option value="M">Masculino</option>
                                        <option value="F">Femenino</option>
                                    </select>
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: "#000" }}>Teléfono:*</label>
                                    <input
                                        placeholder="Teléfono"
                                        name="teléfono"
                                        className="form-control"
                                        value={jugador.teléfono}
                                        onChange={handleInputChange}
                                        style={{ background: "#e6e5e5", color: "#151414" }}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: "#000" }}>Email:*</label>
                                    <input
                                        placeholder="Email"
                                        name="email"
                                        className="form-control"
                                        value={jugador.email}
                                        onChange={handleInputChange}
                                        style={{ background: "#e6e5e5", color: "#151414" }}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: "#000" }}>Estatura (cm.):</label>
                                    <input
                                        placeholder="Estatura"
                                        name="estatura"
                                        className="form-control"
                                        value={jugador.estatura}
                                        onChange={handleInputChange}
                                        style={{ background: "#e6e5e5", color: "#151414" }}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: "#000" }}>Peso (Kg.):</label>
                                    <input
                                        placeholder="Peso"
                                        name="peso"
                                        className="form-control"
                                        value={jugador.peso}
                                        onChange={handleInputChange}
                                        style={{ background: "#e6e5e5", color: "#151414" }}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: "#000" }}>Alcance de Mano (cm.):</label>
                                    <input
                                        placeholder="Alcance de Mano"
                                        name="alcanceMano"
                                        className="form-control"
                                        value={jugador.alcanceMano}
                                        onChange={handleInputChange}
                                        style={{ background: "#e6e5e5", color: "#151414" }}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: "#000" }}>Alcance de Bloqueo (cm.):</label>
                                    <input
                                        placeholder="Alcance de Bloqueo"
                                        name="alcanceBloqueo"
                                        className="form-control"
                                        value={jugador.alcanceBloqueo}
                                        onChange={handleInputChange}
                                        style={{ background: "#e6e5e5", color: "#151414" }}
                                    />
                                </div>

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
