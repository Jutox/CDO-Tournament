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
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const indexOfLastEquipo = currentPage * equiposPerPage;
    const indexOfFirstEquipo = indexOfLastEquipo - equiposPerPage;

    const filteredEquipos = equipos
        .filter((equipo) =>
            equipo.nombreEquipo.toLowerCase().includes(searchName.toLowerCase())
        )
        .slice(indexOfFirstEquipo, indexOfLastEquipo);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div style={{ background: '#202124', color: '#000', minHeight: '100vh', padding: '20px' , paddingTop: '80px' }}>
            &nbsp;
            <h1 className="text-left" style={{color: '#F4B205'}}>
                CDO Tournament
            </h1>
            &nbsp;
            <div className="container">
                &nbsp;
                <h2 className="text-center" style={{ color: '#fff' }}>Lista de Equipos</h2>
                &nbsp;
                <div className="row justify-content-left">
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
                    <Table striped bordered hover variant="light">
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
                                        to={`/perfilEquipo/${equipo.idEquipo}`}
                                        className="btn btn-warning"
                                        style={{ background: "#F4B205", color: "#000", width: "auto" }}
                                    >
                                        Ver Equipo
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <Link
                            to="/addEquipo"
                            className="btn btn-primary mb-2"
                            style={{ backgroundColor: "#F4B205", color: "#000" }}
                        >
                            Agregar Equipo
                        </Link>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <Pagination>
                        {Array.from({ length: Math.ceil(equipos.length / equiposPerPage) }).map((_, index) => (
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

export default AdministrarEquipos;
