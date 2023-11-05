import React from "react";
import { BsBook } from "react-icons/bs";
import iconCDO from '../Assets/iconCDO.svg'; // Asegúrate de que la ruta sea correcta

const Navbar = () => {
  const iconStyle = {
    width: "40px", // Ajusta el tamaño del icono según tus preferencias
    height: "40px",
    marginRight: "10px", // Espacio entre el icono y el texto
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand mx-auto" href="#">
          <img
            src={iconCDO}
            alt="Custom Icon"
            style={iconStyle} // Aplicar el estilo aquí
          />
          CDO Tournament 1.0V
        </a>
      </div>
    </nav>
  );
};

export default Navbar;