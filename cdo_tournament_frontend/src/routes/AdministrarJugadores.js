import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';
import JugadorService from '../services/JugadorService';
import JugadorPartidoService from "../services/JugadorPartidoService";
import * as IoIcons from "react-icons/io";
import * as XLSX from 'xlsx';
import {IoIosArrowDropdown} from "react-icons/io";

export const AdministrarJugadores = () => {
    const [jugadores, setJugadores] = useState([]);
    const [jugadoresPartido, setJugadoresPartido] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const empleadosPerPage = 10;

    useEffect(() => {
        JugadorService.getJugadores()
            .then((response) => {
                setJugadores(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        JugadorPartidoService.getJugadoresPartido()
            .then((response) => {
                setJugadoresPartido(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const indexOfLastJugador = currentPage * empleadosPerPage;
    const indexOfFirstJugador = indexOfLastJugador - empleadosPerPage;

    const filteredJugadores = jugadores
        .filter((jugador) =>
            jugador.nombres.toLowerCase().includes(searchName.toLowerCase())
        )
        .slice(indexOfFirstJugador, indexOfLastJugador);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(jugadores);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Jugadores");
        XLSX.writeFile(wb, "jugadores.xlsx");
    };

    return (
        <div style={{ background: "#202124", color: "#000", minHeight: "100vh", paddingTop: '80px' }}>
            &nbsp;
            <div className="container" style={{ padding: "20px" }}>
                <h2 className="text-center" style={{ color: '#ffffff' }}>Lista de Jugadores</h2>
                &nbsp;
                <div className="row">
                    <div className="col-md-4">
                        <input
                            type="text"
                            placeholder="Buscar por nombre"
                            onChange={(e) => setSearchName(e.target.value)}
                            className="form-control mb-3"
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <Table striped bordered hover variant="light" className="table-xl">
                        <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Rut</th>
                            <th>Apellidos</th>
                            <th>Fecha Nacimiento</th>
                            <th>Genero</th>
                            <th>Telefono</th>
                            <th>Email</th>
                            <th>Estatura</th>
                            <th>Peso</th>
                            <th>Alcance Mano</th>
                            <th>Alcance Bloqueo</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredJugadores.map((jugador) => (
                            <tr key={jugador.idJugador}>
                                <td>{jugador.nombres}</td>
                                <td>{jugador.rut}</td>
                                <td>{jugador.apellidoPaterno + ' ' + jugador.apellidoMaterno}</td>
                                <td>{jugador.fechaNacimiento}</td>
                                <td>{jugador.genero}</td>
                                <td>{jugador.telefono}</td>
                                <td>{jugador.email}</td>
                                <td>{jugador.estatura}</td>
                                <td>{jugador.peso}</td>
                                <td>{jugador.alcanceMano}</td>
                                <td>{jugador.alcanceBloqueo}</td>
                                <td>
                                    <Link
                                        to={`/perfilJugador/${jugador.idJugador}`}
                                        className="btn btn-warning"
                                        style={{ background: "#F4B205", color: "#000", width: "auto" }}
                                    >
                                        Ver Perfil
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                &nbsp;
                <div className="row">
                    <div className="col-md-4">
                        <Link
                            to="/addJugador"
                            className="btn btn-primary mb-2"
                            style={{ backgroundColor: "#F4B205", color: "#000" }}
                        >
                            Agregar Jugador
                        </Link>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="col-md-4 text-end">
                        <Link
                            onClick={exportToExcel}
                            className="btn btn-primary mb-2"
                            style={{ backgroundColor: "#F4B205", color: "#000" }}
                        >
                            Exportar Excel <IoIcons.IoIosArrowDropdown />
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <Pagination>
                        {Array.from({ length: Math.ceil(jugadores.length / empleadosPerPage) }).map((_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>
        </div>
    );
};

export default AdministrarJugadores;
