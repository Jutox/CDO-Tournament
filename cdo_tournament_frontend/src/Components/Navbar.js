import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SideBarData } from './SideBarData';
import '../App.css';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const showSidebar = () => setSidebar(!sidebar);
    const toggleDropdown = () => setShowDropdown(!showDropdown);

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
                <Link to={`/PerfilJugador/${3}`} style={dropdownItemStyle} onClick={closeDropdown}>
                    Mi Perfil
                </Link>
                <Link to={`/updateJugador/${3}`} style={dropdownItemStyle} onClick={closeDropdown}>
                    Configuracion
                </Link>
                <Link to="/" style={dropdownItemStyle} onClick={() => { closeDropdown(); logout(); }}>
                    Cerrar Sesion
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
                    style={{ ...iconStyle, width: '47px', height: '45px' }}
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
                            {SideBarData.map((item, index) => (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
}

export default Navbar;
