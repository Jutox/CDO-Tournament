import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai';
import {Link, useLocation} from 'react-router-dom';
import { SideBarData } from './SideBarData';
import '../App.css';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();

    const showSidebar = () => setSidebar(!sidebar);
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const iconStyle = {
        marginRight: '0',
    };

    const dropdownStyle = {
        display: showDropdown ? 'block' : 'none', // Conditional rendering
        position: 'absolute',
        maxWidth: "10px",
        top: '80px', // Adjust as needed
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
        fontSize: '3rem', // Increase font size to make the icon larger
        cursor: 'pointer',
        color: '#fefefe', // Change to your desired color
        marginRight: '30px',
    };

    const dropdownItemStyle = {
        padding: '10px 20px',
        textDecoration: 'none', // Remove underline from links
        color: 'black', // Light text color for contrast
        display: 'block', // Ensure each link takes up the full width of the dropdown
        backgroundColor: 'transparent', // Ensure background is transparent
        textAlign: "center",
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };

    function DropdownMenu() {

        return (
            <div className="dropdown-menu" style={dropdownStyle}>
                <Link to={`/PerfilJugador/${3}`} style={dropdownItemStyle} onClick={closeDropdown}>
                    Profile
                </Link>
                <Link to={`/updateJugador/${3}`} style={dropdownItemStyle} onClick={closeDropdown}>
                    Settings
                </Link>
                <Link to="/" style={dropdownItemStyle} onClick={closeDropdown}>
                    Logout
                </Link>
            </div>
        );
    }

    return (
        <div className={`navbar ${sidebar ? 'active' : ''}`} style={{ zIndex: 1000 }}>
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
