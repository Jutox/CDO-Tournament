import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SideBarData } from "./SideBarData";
import iconCDO from '../Assets/iconCDO.svg';
import "../App.css"; // Importa tu archivo CSS aquí

function Navbar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const iconStyle = {
        minWidth: "3%",
        maxWidth: "3%",
        minHeight: "20%",
        maxHeight: "20%",
        marginRight: "2%",
    };

    return (
        <div className={`navbar ${sidebar ? "active" : ""}`} style={{ zIndex: 1000 }}>
            <div className="menu-bars">
                <FaBars className="menu-icon" onClick={showSidebar} />
            </div>
            <div className="menu-center">
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
