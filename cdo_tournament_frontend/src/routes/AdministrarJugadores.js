import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';
import JugadorService from '../services/JugadorService';

export const AdministrarJugadores = () => {
    const [jugadores, setJugadores] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [empleadosPerPage] = useState(10);

    useEffect(() => {
        JugadorService.getJugadores()
            .then((response) => {
                setJugadores(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const filteredJugadores = jugadores.filter((jugador) => {
        return jugador.nombres.toLowerCase().includes(searchName.toLowerCase());
    });

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ background: "#d4d1d0", color: "#000", minHeight: "93vh" }}>
            <div className="container" style={{ padding: "20px" }}>
                <h2 className="text-center">Lista de Jugadores</h2>
                <div className="row">
                    <div className="col-md-4">
                        <input
                            type="text"
                            placeholder="Buscar por nombre"
                            onChange={(e) => setSearchName(e.target.value)}
                            className="form-control mb-3"
                            style={{ background: "#bcbdbe", color: "#151414" }}
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <Table striped bordered hover variant="grey" className="table-xl">
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
                                        to={`/updateJugador/${jugador.idJugador}`}
                                        className="btn btn-warning"
                                        style={{ background: "#F4B205", color: "#000" }}
                                    >
                                        Actualizar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        {[...Array(Math.ceil(filteredJugadores.length / empleadosPerPage)).keys()].map((number) => (
                            <Pagination.Item
                                key={number + 1}
                                onClick={() => paginate(number + 1)}
                                active={number + 1 === currentPage}
                            >
                                {number + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
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
                </div>
            </div>
        </div>
    );
};

export default AdministrarJugadores;