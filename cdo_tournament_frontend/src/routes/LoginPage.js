import React, { useState } from 'react';
import './LoginPage.css'; // You can create a CSS file for styling
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom"; // Import Bootstrap Card component

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e, formData) => {
        e.preventDefault();
            // Tu lógica de autenticación aquí
        navigate('/home'); // Redirige a la página '/home' si la autenticación es exitosa

    };

    return (
        <div>
            <div className="background-blur"></div>
            <div className="login-container" >
                &nbsp;
                <Card className="login-card">
                    <Card.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label style={{ color: "#000" }}>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ color: "#000" }}>Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="login-button"
                                onClick= {handleSubmit}
                            >
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
