import React, { useEffect, useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import ListaJugadoresPartidoService from '../services/ListaJugadoresPartidoService';
import {Link} from "react-router-dom";

const AdministrarListasJugadoresPartidos = () => {
    const [listasJugadores, setListasJugadores] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const listasJugadoresPerPage = 10;

    useEffect(() => {
        ListaJugadoresPartidoService.getListasJugadoresPartido()
            .then((response) => {
                setListasJugadores(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ background: '#202124', color: '#000', minHeight: '100vh', padding: '20px' , paddingTop: '80px' }}>
            &nbsp;
            <h1 className="text-left" style={{color: '#F4B205'}}>
                CDO Tournament
            </h1>
            &nbsp;
            <div className="container" style={{ padding: '20px' }}>
                <h2 className="text-center">Lista de Jugadores Partidos</h2>
                <div className="row justify-content-center">
                    <Table striped bordered hover variant="grey" className="table-xl">
                        <thead>
                        <tr>
                            <th>ID Lista Jugadores</th>
                            <th>Equipo</th>
                            <th>Partido</th>
                            {/* Agrega las columnas necesarias según tu modelo */}
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listasJugadores.map((listaJugadores) => (
                            <tr key={listaJugadores.idListaJugadoresPartido}>
                                <td>{listaJugadores.idListaJugadoresPartido}</td>
                                <td>{listaJugadores.equipo.nombreEquipo}</td>
                                <td>{listaJugadores.partido.nombreCompeticion}</td>
                                {/* Agrega las columnas necesarias según tu modelo */}
                                <td>
                                    {/* Agrega enlaces o botones para acciones, similar al componente anterior */}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        {[...Array(Math.ceil(listasJugadores.length / listasJugadoresPerPage)).keys()].map((number) => (
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
                            to="/addListaJugadorPartido"
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

export default AdministrarListasJugadoresPartidos;
