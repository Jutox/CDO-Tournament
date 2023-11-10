import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SideBarData } from "./SideBarData";
import iconCDO from '../Assets/iconCDO.svg';
import "../App.css";

function Navbar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const iconStyle = {
        minWidth: "3%", // Tamaño mínimo de la imagen
        maxWidth: "3%", // Tamaño máximo de la imagen (100% del contenedor)
        minHeight: "20%", // Altura mínima de la imagen
        maxHeight: "20%", // Autoajustar la altura proporcionalmente
        marginRight: "2%", // Ajusta el margen derecho según tu diseño
    };

    return (
        <div className={`navbar ${sidebar ? "active" : ""}`}>
            <div className="menu-bars">
                <FaBars className="menu-icon" onClick={showSidebar} />
            </div>
            <div className="menu-center">
                {/* Aplica el estilo al elemento img */}
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrObGYcoNyS8zpekqt8iMVvp4YzOHD3qdgx1lsd7Im1om0p3bEuiyWIUAjSa8xN-hdWVM&usqp=CAU" style={iconStyle} alt="Icono CDO" />
            </div>

            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
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
        </div>
    );
}

export default Navbar;