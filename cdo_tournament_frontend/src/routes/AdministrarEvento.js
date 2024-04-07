import React, { useEffect, useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import EventoService from '../services/EventosService'; // Assuming this service is similar to SetPartidoService
import { Link } from "react-router-dom";

const AdministrarEvento = () => {
    const [eventos, setEventos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventosPerPage = 10;

    useEffect(() => {
        EventoService.getEventos() // Replace with the correct method to fetch events
            .then((response) => {
                setEventos(response.data);
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
                <h2 className="text-center">Lista de Eventos</h2>
                <Table striped bordered hover variant="grey" className="table-xl">
                    <thead>
                    <tr>
                        <th>ID Evento</th>
                        <th>Hora</th>
                        <th>Tipo de Evento</th>
                        <th>Puntos</th>
                        <th>Orden de Servicio</th>
                        <th>Ronda de Servicio</th>
                        <th>ID Jugador Partido</th>
                        <th>ID Set Partido</th>
                        <th>ID Jugador</th>
                    </tr>
                    </thead>
                    <tbody>
                    {eventos.map((evento) => (
                        <tr key={evento.idEvento}>
                            <td>{evento.idEvento}</td>
                            <td>{evento.hora}</td>
                            <td>{evento.tipo}</td>
                            <td>{evento.puntos}</td>
                            <td>{evento.ordenServicio}</td>
                            <td>{evento.rondaServicio}</td>
                            <td>{evento.jugadorPartido && evento.jugadorPartido.idJugadorPartido}</td>
                            <td>{evento.set && evento.set.idSetPartido}</td>
                            <td>{evento.jugadorPartido.jugador.nombres}</td></tr>
                    ))}
                    </tbody>
                </Table>
                <Pagination>
                    {[...Array(Math.ceil(eventos.length / eventosPerPage)).keys()].map((number) => (
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
                            to="/addEventoForm"
                            className="btn btn-primary mb-2"
                            style={{ backgroundColor: '#F4B205', color: '#000' }}
                        >
                            Agregar Evento
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdministrarEvento;
