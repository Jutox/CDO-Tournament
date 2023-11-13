import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';
import EquipoService from '../services/EquipoService';

const AdministrarEquipos = () => {
    const [equipos, setEquipos] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const equiposPerPage = 10;

    useEffect(() => {
        EquipoService.getEquipos()
            .then((response) => {
                setEquipos(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const filteredEquipos = equipos.filter((equipo) =>
        equipo.nombreEquipo.toLowerCase().includes(searchName.toLowerCase())
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ background: '#d4d1d0', color: '#000', minHeight: '93vh' }}>
            <div className="container" style={{ padding: '20px' }}>
                <h2 className="text-center">Lista de Equipos</h2>
                <div className="row">
                    <div className="col-md-4">
                        <input
                            type="text"
                            placeholder="Buscar por nombre"
                            onChange={(e) => setSearchName(e.target.value)}
                            className="form-control mb-3"
                            style={{ background: '#bcbdbe', color: '#151414' }}
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <Table striped bordered hover variant="grey" className="table-xl">
                        <thead>
                        <tr>
                            <th>Nombre del Equipo</th>
                            <th>Nombre del Entrenador</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredEquipos.map((equipo) => (
                            <tr key={equipo.idEquipo}>
                                <td>{equipo.nombreEquipo}</td>
                                <td>{equipo.nombreEntrenador}</td>
                                <td>
                                    <Link
                                        to={`/updateEquipo/${equipo.idEquipo}`}
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
                        {[...Array(Math.ceil(filteredEquipos.length / equiposPerPage)).keys()].map((number) => (
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
                            to="/addEquipo"
                            className="btn btn-primary mb-2"
                            style={{ backgroundColor: '#F4B205', color: '#000' }}
                        >
                            Agregar Equipo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdministrarEquipos;