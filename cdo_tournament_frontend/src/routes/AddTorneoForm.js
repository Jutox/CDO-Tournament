import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import TorneoService from '../services/TorneoService';

export const AddTorneoForm = () => {
    const [torneo, setTorneo] = useState({
        nombre: '',
        fechaInicio: '',
        fechaTermino: '',
        lugar: '',
    });

    const navigate = useNavigate();

    const saveTorneo = (e) => {
        e.preventDefault();

        if (!torneo.nombre || !torneo.fechaInicio || !torneo.fechaTermino || !torneo.lugar) {
            alert('Todos los campos obligatorios deben ser llenados. Por favor, completa el formulario.');
            return;
        }

        TorneoService.createTorneo(torneo)
            .then((response) => {
                console.log(response.data);
                navigate('/torneos');
            })
            .catch((error) => {
                console.error(error);
                alert('La captura de datos tuvo un error. Por favor, intenta nuevamente.');
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTorneo({ ...torneo, [name]: value });
    };

    return (
        <div style={{ background: "#202124", color: "#000", minHeight: "100vh" , paddingTop: '80px'}}>
            <div className="container" style={{ padding: "20px" }}>
                &nbsp;
                <h2 className="text-center" style={{ color: '#ffffff' }}>Agregar Torneo</h2>
                &nbsp;
                <div className="row justify-content-center">
                    <div className="card col-md-8" style={{ background: "#bcbdbe", color: "#000" }}>
                        <div className="card-body">
                            <form>
                                {Object.keys(torneo).map((key) => (
                                    <div className="form-group mb-2" key={key}>
                                        <label style={{ color: "#000" }}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                                        <input
                                            placeholder={key}
                                            name={key}
                                            type={key.includes('fecha') ? 'date' : 'text'}
                                            className="form-control"
                                            value={torneo[key]}
                                            onChange={handleInputChange}
                                            style={{ background: "#e6e5e5", color: "#151414" }}
                                        />
                                    </div>
                                ))}

                                <button className="btn btn-success" onClick={saveTorneo} style={{ background: "#F4B205", color: "#fff" }}>
                                    Guardar
                                </button>

                                <Link
                                    to={`/torneos`}
                                    className="btn btn-danger"
                                    style={{ background: '#dc3545', color: '#fff' }}
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

export default AddTorneoForm;