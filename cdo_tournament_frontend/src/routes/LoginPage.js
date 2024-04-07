import React, { useState } from 'react';
import './LoginPage.css';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import LoginService from '../services/LoginService';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const setCookie = (name, value, daysToLive) => {
        let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
        if (daysToLive) {
            const date = new Date();
            date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
            cookie += `; max-age=${date.toUTCString()}`;
        }
        document.cookie = cookie;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await LoginService.login(formData);

            if (response.status === 202) {
                // Make sure jwtToken is a string. Adjust according to your API response.
                const jwtToken = response.data.jwt; // Assuming the JWT is in a property called 'jwt'
                if (typeof jwtToken === 'string') {
                    setCookie('jwt', jwtToken, 1); // Storing the token in a cookie for 1 day
                    navigate('/home');
                } else {
                    console.log('Received JWT is not in the correct format');
                }
            } else {
                console.log('Autenticación fallida');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    return (
        <div>
            <div className="background-blur"></div>
            <div className="login-container">
                &nbsp;
                <Card className="login-card">
                    <Card.Body>
                        <h1 style={{ textAlign: 'center', fontSize: '3rem', color: '#000', marginTop: '0px', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)' }}>Iniciar Sesión</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label style={{ color: '#000' }}>Email:</label>
                                <input
                                    type="email"
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ color: '#000' }}>Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="login-button">
                                Login
                            </button>
                        </form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
