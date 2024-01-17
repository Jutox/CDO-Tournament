import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';
import PartidoService from '../services/PartidoService';

const AdministrarPartidos = () => {
    const [partidos, setPartidos] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const partidosPerPage = 10;

    useEffect(() => {
        PartidoService.getPartidos()
            .then((response) => {
                setPartidos(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const indexOfLastPartido = currentPage * partidosPerPage;
    const indexOfFirstPartido = indexOfLastPartido - partidosPerPage;

    const filteredPartidos = partidos
        .filter((partido) =>
            partido.nombreCompeticion.toLowerCase().includes(searchName.toLowerCase())
        )
        .slice(indexOfFirstPartido, indexOfLastPartido);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatDate = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div style={{ background: "#202124", color: "#000", minHeight: "100vh", paddingTop: '80px' }}>
            &nbsp;
            <div className="container" style={{ padding: '20px' }}>
                <h2 className="text-center" style={{ color: '#ffffff' }}>Lista de Partidos</h2>
                &nbsp;
                <div className="row">
                    <div className="col-md-4">
                        <input
                            type="text"
                            placeholder="Buscar por competición"
                            onChange={(e) => setSearchName(e.target.value)}
                            className="form-control mb-3"
                            style={{ background: '#bcbdbe', color: '#151414' }}
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <Table striped bordered hover variant="light" className="table-xl">
                        <thead>
                        <tr>
                            <th>ID Partido</th>
                            <th>Competición</th>
                            <th>Ciudad</th>
                            <th>Código de País</th>
                            <th>Recinto</th>
                            <th>Fase</th>
                            <th>Número de Partido</th>
                            <th>División</th>
                            <th>Categoría</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Torneo</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredPartidos.map((partido) => (
                            <tr key={partido.idPartido}>
                                <td>{partido.idPartido}</td>
                                <td>{partido.nombreCompeticion}</td>
                                <td>{partido.ciudad}</td>
                                <td>{partido.codigoPais}</td>
                                <td>{partido.recinto}</td>
                                <td>{partido.fase}</td>
                                <td>{partido.numeroPartido}</td>
                                <td>{partido.division}</td>
                                <td>{partido.categoria}</td>
                                <td>{partido.fecha}</td>
                                <td>{formatDate(new Date(partido.hora))}</td>
                                <td>{partido.torneo ? partido.torneo.nombre : 'N/A'}</td>
                                <td>
                                    <Link
                                        to={`/perfilPartido/${partido.idPartido}`}
                                        className="btn btn-warning"
                                        style={{ background: '#F4B205', color: '#000' }}
                                    >
                                        Ver Datos/Sets
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
                            to="/addPartido"
                            className="btn btn-primary mb-2"
                            style={{ backgroundColor: '#F4B205', color: '#000' }}
                        >
                            Agregar Partido
                        </Link>
                    </div>
                </div>
                &nbsp;
                <Pagination>
                    {[...Array(Math.ceil(partidos.length / partidosPerPage)).keys()].map((number) => (
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
        </div>
    );
};

export default AdministrarPartidos;
