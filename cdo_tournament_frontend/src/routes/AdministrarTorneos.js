import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';
import TorneoService from '../services/TorneoService';

const AdministrarTorneos = () => {
    const [torneos, setTorneos] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const torneosPerPage = 10;

    useEffect(() => {
        TorneoService.getTorneos()
            .then((response) => {
                setTorneos(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const indexOfLastTorneo = currentPage * torneosPerPage;
    const indexOfFirstTorneo = indexOfLastTorneo - torneosPerPage;
    const currentTorneos = torneos.slice(indexOfFirstTorneo, indexOfLastTorneo);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredTorneos = currentTorneos.filter((torneo) =>
        torneo.nombre.toLowerCase().includes(searchName.toLowerCase())
    );

    return (
        <div style={{ background: "#202124", color: "#000", minHeight: "93vh" }}>
        <div className="container" style={{ padding: '20px' }}>
            &nbsp;
            <h2 className="text-center" style={{ color: '#ffffff' }}>Lista de Torneos</h2>
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
                            <th>Nombre</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Termino</th>
                            <th>Lugar</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredTorneos.map((torneo) => (
                            <tr key={torneo.idTorneo}>
                                <td>{torneo.nombre}</td>
                                <td>{torneo.fechaInicio}</td>
                                <td>{torneo.fechaTermino}</td>
                                <td>{torneo.lugar}</td>
                                <td>
                                    <Link
                                        to={`/updateTorneo/${torneo.idTorneo}`}
                                        className="btn btn-warning"
                                        style={{ background: '#F4B205', color: '#000' }}
                                    >
                                        Actualizar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        {[...Array(Math.ceil(torneos.length / torneosPerPage)).keys()].map((number) => (
                            <Pagination.Item
                                key={number + 1}
                                onClick={() => handlePageChange(number + 1)}
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
                            to="/addTorneo"
                            className="btn btn-primary mb-2"
                            style={{ backgroundColor: '#F4B205', color: '#000' }}
                        >
                            Agregar Torneo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdministrarTorneos;
