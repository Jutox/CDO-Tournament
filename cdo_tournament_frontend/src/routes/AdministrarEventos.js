import React, { useEffect, useState } from 'react';
import JugadorService from '../services/JugadorService';
import { Link } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';

export const AdministrarEventos = () => {
    const [jugadores, setJugadores] = useState([]);
    
    const [searchName, setSearchName] = useState('');
    const [searchCargo, setSearchCargo] = useState('');
    const [searchContrato, setSearchContrato] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [empleadosPerPage] = useState(10);

    useEffect(() => {
        JugadorService.getJugadores().then((response) => {
            setJugadores(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const filteredJugadores = jugadores.filter((jugador) => {
        return (
            jugador.rut.toLowerCase().includes(searchName.toLowerCase())
        );
    });

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ background: "#d4d1d0", color: "#000", minHeight: "93vh" }}>
            <div className="container" style={{ padding: "20px" }}>
                <h2 className="text-center">Lista de Eventos</h2>
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
                    <div className="col-md-4">
                        <input
                            type="text"
                            placeholder="Buscar por cargo"
                            onChange={(e) => setSearchCargo(e.target.value)}
                            className="form-control mb-3"
                            style={{ background: "#bcbdbe", color: "#151414" }}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            placeholder="Buscar por contrato"
                            onChange={(e) => setSearchContrato(e.target.value)}
                            className="form-control mb-3"
                            style={{ background: "#bcbdbe", color: "#151414" }}
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <Table striped bordered hover variant="grey" className="table-xl" >
                        <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Rut</th>
                            <th>Apellidos</th>
                            <th>Correo</th>
                            <th>Cargo</th>
                            <th>Contrato</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredJugadores.map((jugador) => (
                            <tr key={jugador.id}>
                                <td>{jugador.rut}</td>
                                <td>{jugador.nombres}</td>
                                <td>{jugador.apellidos}</td>
                                <td>{jugador.correo}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        {[...Array(Math.ceil(filteredJugadores.length / empleadosPerPage)).keys()].map((number) => (
                            <Pagination.Item key={number + 1} onClick={() => paginate(number + 1)} active={number + 1 === currentPage}>
                                {number + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/" className="btn btn-primary mb-2" style={{ backgroundColor: "#F4B205",  color: "#000" }}>
                            Agregar Cargo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdministrarEventos;