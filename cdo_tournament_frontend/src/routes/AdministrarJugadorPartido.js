import React, { useEffect, useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import JugadorPartidoService from '../services/JugadorPartidoService';
import { Link } from "react-router-dom";
import AddJugadorPartidoForm from "./AddJugadorPartidoForm";

const AdministrarJugadorPartido = () => {
    const [jugadoresPartido, setJugadorPartido] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const listasJugadoresPerPage = 10;

    useEffect(() => {
        JugadorPartidoService.getJugadoresPartido()
            .then((response) => {
                setJugadorPartido(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ background: '#d4d1d0', color: '#000', minHeight: '100vh', paddingTop: '80px' }}>
            <div className="container" style={{ padding: '20px' }}>
                <h2 className="text-center">Jugadores Partidos</h2>
                <div className="row justify-content-center">
                    <Table striped bordered hover variant="grey" className="table-xl">
                        <thead>
                        <tr>
                            <th>ID Jugador Partido</th>
                            <th>Número Camiseta</th>
                            <th>Capitán</th>
                            <th>Jugador</th>
                            <th>ID Lista</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {jugadoresPartido.map((jugadorPartido) => (
                            <tr key={jugadorPartido.idJugadorPartido}>
                                <td>{jugadorPartido.idJugadorPartido}</td>
                                <td>{jugadorPartido.numeroCamiseta}</td>
                                <td>{jugadorPartido.capitan ? "Sí" : "No"}</td>
                                <td>{jugadorPartido.jugador.nombres}</td>
                                <td>{jugadorPartido.listaJugadoresPartido.idListaJugadoresPartido}</td>

                                <td>
                                    {/* Agrega enlaces o botones para acciones, como editar o eliminar */}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        {[...Array(Math.ceil(jugadoresPartido.length / listasJugadoresPerPage)).keys()].map((number) => (
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
                            to="/addJugadorPartidoForm"
                            className="btn btn-primary mb-2"
                            style={{ backgroundColor: '#F4B205', color: '#000' }}
                        >
                            Agregar Partido
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdministrarJugadorPartido;
