import React, {useEffect, useState} from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SideBarData } from './SideBarData';
import { SideBarDataJugador } from './SideBarDataJugador';
import '../App.css';
import JugadorService from "../services/JugadorService";

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [id, setId] = useState();

    const [userDataCall, setUserDataCall] = useState(0);

    const [jugador, setJugador] = useState({
        idJugador: '',
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

    const [userData, setUserData] = useState({
        id:'',
        name: '',
        password: '',
        username: '',
        role: '',
    });

/*
    useEffect(() => {
        if (userData === null || userDataCall === 0) {
            // When userData is initially null, make the call to set it
            const jwt = getCookie('jwt');
            setUserData(decodeJWT(jwt));
            setUserDataCall(1); // Update userDataCall to avoid repeated calls

            console.log("HOLAAA")

            JugadorService.getJugadorByEmail(userData.username)
                .then((jugadorResponse) => {
                    const jugadorData = jugadorResponse.data;
                    setJugador({
                        ...jugadorData,
                        fechaNacimiento: jugadorData.fechaNacimiento ? new Date(jugadorData.fechaNacimiento) : null,
                    });
                    console.log(jugador)
                    setId(jugador.idJugador);
                })
                .catch((jugadorError) => {
                    console.error('Error fetching jugador:', jugadorError);
                });
        }
    }, [showDropdown, userDataCall]);
*/


    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    if (userData === null) {
        setUserDataCall(1);
        return null; // or you can return a loading indicator or a different component
    }

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

    const showSidebar = () => setSidebar(!sidebar);
    const toggleDropdown = () =>{
        setUserDataCall(0)
        setShowDropdown(!showDropdown)
    }

    const iconStyle = {
        marginRight: '0',
    };

    const dropdownStyle = {
        display: showDropdown ? 'block' : 'none',
        position: 'absolute',
        maxWidth: "10px",
        top: '80px',
        right: '0',
        backgroundColor: 'white',
        color: 'dark',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 1001,
        opacity: showDropdown ? 1 : 0,
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        transform: showDropdown ? 'translateY(0)' : 'translateY(-20px)'
    };

    const profileIconStyle = {
        fontSize: '3rem',
        cursor: 'pointer',
        color: '#fefefe',
        marginRight: '30px',
    };

    const dropdownItemStyle = {
        padding: '10px 20px',
        textDecoration: 'none',
        color: 'black',
        display: 'block',
        backgroundColor: 'transparent',
        textAlign: "center",
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };

    const logout = () => {
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/');
    };

    function DropdownMenu() {
        return (
            <div className="dropdown-menu" style={dropdownStyle}>
                <Link to={`/perfilJugador/2`} style={dropdownItemStyle} onClick={closeDropdown}>
                    Mi Perfil
                </Link>
                <Link to={`/updateUser`} style={dropdownItemStyle} onClick={closeDropdown}>
                    Configuración
                </Link>
                <Link to="/" style={dropdownItemStyle} onClick={() => { closeDropdown(); logout(); }}>
                    Cerrar Sesión
                </Link>
            </div>
        );
    }

    return (
        <div className={`navbar ${sidebar ? 'active' : ''}`} style={{ zIndex: 1000, position: 'fixed', width: '100%' }}>
            {location.pathname === '/' ? null : (
                <div className="menu-bars">
                    <FaBars className="menu-icon" onClick={showSidebar} />
                </div>
            )}
            <div className="menu-center">
                <img
                    src="https://i.postimg.cc/kG8f91LY/iconCDO.jpg"
                    style={{ ...iconStyle, width: '44px', height: '43px' }}
                    alt="Icono CDO"
                />
            </div>

            {location.pathname === '/' ? null : (
                <>
                    <nav className="profile-section">
                        <AiOutlineUser
                            className="profile-icon"
                            style={profileIconStyle}
                            onClick={toggleDropdown}
                        />
                        <DropdownMenu />
                    </nav>

                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className="nav-menu-items" onClick={showSidebar}>
                            <li className="navbar-toggle">
                                <Link to="#" className="menu-bars">
                                    <AiOutlineClose />
                                </Link>
                            </li>
                            {userData && userData.role === 'PLAYER' ? (
                                SideBarDataJugador.map((item, index) => (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                SideBarData.map((item, index) => (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
}

export default Navbar;
