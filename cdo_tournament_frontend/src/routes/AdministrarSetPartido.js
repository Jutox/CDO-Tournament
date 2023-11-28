import React, { useEffect, useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import SetPartidoService from '../services/SetPartidoService';
import {Link} from "react-router-dom";

const AdministrarSetPartido = () => {
    const [sets, setSets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const setsPerPage = 10;

    useEffect(() => {
        SetPartidoService.getSetsPartido()
            .then((response) => {
                setSets(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ background: '#d4d1d0', color: '#000', minHeight: '93vh' }}>
            <div className="container" style={{ padding: '20px' }}>
                <h2 className="text-center">Lista de Sets de Partidos</h2>
                <Table striped bordered hover variant="grey" className="table-xl">
                    <thead>
                    <tr>
                        <th>ID Set</th>
                        <th>Partido</th>
                        <th>Número de Set</th>
                        <th>Hora de Inicio</th>
                        <th>Hora de Termino</th>
                        <th>Puntaje A</th>
                        <th>Puntaje B</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sets.map((set) => (
                        <tr key={set.idSetPartido}>
                            <td>{set.idSetPartido}</td>
                            <td>{set.partido ? set.partido.nombreCompeticion : 'N/A'}</td>
                            <td>{set.numeroSet}</td>
                            <td>{set.horaInicio}</td>
                            <td>{set.horaTermino}</td>
                            <td>{set.puntajeA}</td>
                            <td>{set.puntajeB}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Pagination>
                    {[...Array(Math.ceil(sets.length / setsPerPage)).keys()].map((number) => (
                        <Pagination.Item
                            key={number + 1}
                            onClick={() => paginate(number + 1)}
                            active={number + 1 === currentPage}
                        >
                            {number + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
                <div className="row">
                    <div className="col-md-4">
                        <Link
                            to="/addSetsPartido"
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

export default AdministrarSetPartido;