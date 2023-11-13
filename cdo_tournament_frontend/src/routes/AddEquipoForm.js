import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EquipoService from '../services/EquipoService';

export const AddEquipoForm = () => {
    const [equipo, setEquipo] = useState({
        nombreEquipo: '',
        nombreEntrenador: '',
    });

    const navigate = useNavigate();

    const saveEquipo = (e) => {
        e.preventDefault();

        if (!equipo.nombreEquipo || !equipo.nombreEntrenador) {
            alert('Todos los campos obligatorios deben ser llenados. Por favor, completa el formulario.');
            return;
        }

        EquipoService.createEquipo(equipo)
            .then((response) => {
                console.log(response.data);
                navigate('/equipos');
            })
            .catch((error) => {
                console.log(error);
                alert('La captura de datos tuvo un error. Por favor, intenta nuevamente.');
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEquipo({ ...equipo, [name]: value });
    };

    return (
        <div style={{ background: "#d4d1d0", color: "#000", minHeight: "93vh" }}>
            <div className="container" style={{ padding: "20px" }}>
                <h2 className="text-center" style={{ color: "#000" }}>Agregar Equipo</h2>
                <div className="row justify-content-center">
                    <div className="card col-md-8" style={{ background: "#bcbdbe", color: "#000" }}>
                        <div className="card-body">
                            <form>
                                {Object.keys(equipo).map((key) => (
                                    <div className="form-group mb-2" key={key}>
                                        <label style={{ color: "#000" }}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                                        <input
                                            placeholder={key}
                                            name={key}
                                            className="form-control"
                                            value={equipo[key]}
                                            onChange={handleInputChange}
                                            style={{ background: "#e6e5e5", color: "#151414" }}
                                        />
                                    </div>
                                ))}

                                <button className="btn btn-success" onClick={saveEquipo} style={{ background: "#F4B205", color: "#fff" }}>
                                    Guardar
                                </button>
                                &nbsp;&nbsp;&nbsp;
                                <Link to="/equipos" className="btn btn-danger" style={{ background: "#dc3545", color: "#fff" }}>
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

export default AddEquipoForm;