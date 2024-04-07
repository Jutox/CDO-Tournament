import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoginService from '../services/LoginService';

export const AddUserForm = () => {
    const [userData, setUserData] = useState({
        name: '',
        password: '',
        username: '',
        role: '',
    });

    const navigate = useNavigate();

    const saveUser = (e) => {
        e.preventDefault();

        if (!userData.name || !userData.name || !userData.username) {
            alert('Todos los campos obligatorios deben ser llenados. Por favor, completa el formulario.');
            return;
        }

        LoginService.register(userData)
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
        setUserData({ ...userData, [name]: value });
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
                <h2 className="text-center" style={{ color: "#ffffff" }}>Agregar Usuario</h2>
                &nbsp;
                <div className="row justify-content-center">
                    <div className="card col-md-8" style={{ background: "#bcbdbe", color: "#000" }}>
                        <div className="card-body">
                            <form>
                                {Object.keys(userData).map((key) => (
                                    <div className="form-group mb-2" key={key}>
                                        <label style={{ color: "#000" }}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                                        <input
                                            placeholder={key}
                                            name={key}
                                            className="form-control"
                                            value={userData[key]}
                                            onChange={handleInputChange}
                                            style={{ background: "#e6e5e5", color: "#151414" }}
                                        />
                                    </div>
                                ))}

                                <button className="btn btn-success" onClick={saveUser} style={{ background: "#F4B205", color: "#fff" }}>
                                    Guardar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUserForm;