import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import LoginService from '../services/LoginService';

const ActualizarUserForm = () => {
    const [userData, setUserData] = useState({
        id:'',
        name: '',
        password: '',
        username: '',
        role: '',
    });

    const id="1";

    const navigate = useNavigate();

    useEffect(() => {
        // Decode JWT and fetch user data
        const jwt = getCookie('jwt');
        setUserData(decodeJWT(jwt));

        console.log(jwt);

    }, [id]);

    const updateUser = () => {
        // Fetch the user data when the component mounts
        LoginService.updateUser(userData.id, userData)
            .then((response) => {
                setUserData({
                    ...response.data,
                });
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const decodeJWT = (token) => {
        try {
            const base64Url = token.split('.')[1]; // Get the payload part of the JWT
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                return `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`;
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error('Error decoding JWT:', e);
            return null;
        }
    };

    return (
        <div style={{ background: '#202124', color: '#000', minHeight: '100vh', padding: '20px' , paddingTop: '80px' }}>
            &nbsp;
            <h1 className="text-left" style={{color: '#F4B205'}}>
                CDO Tournament
            </h1>
            &nbsp;
            &nbsp;
            <h2 className="text-center" style={{ color: '#ffffff' }}>
                Actualizar Usuario
            </h2>
            &nbsp;
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{ background: '#bcbdbe', color: '#000' }}>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Nombre:</label>
                                    <input
                                        type="name"
                                        name="name"
                                        onChange={handleInputChange}
                                        className="form-control"
                                        value={userData.name}
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Contraseña:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={handleInputChange}
                                        className="form-control"
                                        value={userData.name}
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Email:</label>
                                    <input
                                        type="username"
                                        name="username"
                                        onChange={handleInputChange}
                                        className="form-control"
                                        value={userData.username}
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Rol:</label>
                                    <input
                                        type="role"
                                        name="role"
                                        onChange={handleInputChange}
                                        className="form-control"
                                        value={userData.role}
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>

                                <button
                                    onClick={updateUser}
                                    className="btn btn-success"
                                    style={{ backgroundColor: '#F4B205', color: '#000' }}
                                >
                                    Actualizar Usuario
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

export default ActualizarUserForm;
