import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PartidoService from '../services/PartidoService';
import SetPartidoService from '../services/SetPartidoService';
import {Pagination, Table} from "react-bootstrap";

const PerfilPartido = () => {
    const { id } = useParams();
    const [partido, setPartido] = useState({
        nombreCompeticion: '',
        ciudad: '',
        codigoPais: '',
        recinto: '',
        fase: '',
        numeroPartido: 0,
        division: '',
        categoria: '',
        fecha: null,
        hora: null,
        torneo: null,
    });

    const [partidoSets, setPartidoSets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch partido data by ID and set it in the state
        PartidoService.getPartidoById(id)
            .then((response) => {
                const partidoData = response.data;
                setPartido(partidoData);
            })
            .catch((error) => {
                console.error('Error fetching partido:', error);
            });

        // Fetch torneos data
        SetPartidoService.getSetsByIdPartido(id)
            .then((response) => {
                setPartidoSets(response.data);
            })
            .catch((error) => {
                console.error('Error fetching sets:', error);
            });
    }, [id]);

    return (
        <div style={{ background: "#202124", color: "#000", minHeight: "93vh" }}>
            <div className="container" style={{ padding: '20px' }}>
                &nbsp;
                <h2 className="text-center" style={{ color: '#ffffff' }}>
                    Detalles del Partido
                </h2>
                &nbsp;
                <div className="row justify-content-center">
                    <div className="card col-md-8" style={{ background: '#bcbdbe', color: '#000' }}>
                        <div className="card-body">
                            <div style={{ height: "70px", display: "flex", alignItems: "center" }}>
                                <Link to="/partidos" className="btn btn-secondary" style={{ background: "#6C757D", color: "#fff" }}>
                                    Volver
                                </Link>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <Link
                                    to={`/updatePartido/${partido.idPartido}`}
                                    className="btn btn-warning"
                                    style={{ background: "#F4B205", color: "#000", width: "auto" }}
                                >
                                    Actualizar
                                </Link>
                            </div>
                            <form>
                                <div className="row mb-2">
                                    <div className="col-sm-3">
                                        <label style={{ color: '#000' }}>Nombre de la Competición:</label>
                                    </div>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            placeholder="Nombre de la Competición"
                                            name="nombreCompeticion"
                                            className="form-control"
                                            value={partido.nombreCompeticion}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-3">
                                        <label style={{ color: '#000' }}>Ciudad:</label>
                                    </div>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            placeholder="Ciudad"
                                            name="ciudad"
                                            className="form-control"
                                            value={partido.ciudad}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-3">
                                        <label style={{ color: '#000' }}>Código de País:</label>
                                    </div>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            placeholder="Código de País"
                                            name="codigoPais"
                                            className="form-control"
                                            value={partido.codigoPais}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <label style={{ color: '#000' }}>Recinto:</label>
                                    </div>
                                    <div className="col-sm-9">
                                    <input
                                        type="text"
                                        placeholder="Recinto"
                                        name="recinto"
                                        className="form-control"
                                        value={partido.recinto}
                                        readOnly
                                    />
                                </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <label style={{ color: '#000' }}>Fase:</label>
                                    </div>
                                    <div className="col-sm-9">
                                    <input
                                        type="text"
                                        placeholder="Fase"
                                        name="fase"
                                        className="form-control"
                                        value={partido.fase}
                                        readOnly
                                    />
                                </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <label style={{ color: '#000' }}>Número de Partido:</label>
                                    </div>
                                    <div className="col-sm-9">
                                    <input
                                        type="number"
                                        placeholder="Número de Partido"
                                        name="numeroPartido"
                                        className="form-control"
                                        value={partido.numeroPartido}
                                        readOnly
                                    />
                                </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <label style={{ color: '#000' }}>División:</label>
                                    </div>
                                    <div className="col-sm-9">
                                    <input
                                        type="text"
                                        placeholder="División"
                                        name="division"
                                        className="form-control"
                                        value={partido.division}
                                        readOnly
                                    />
                                </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <label style={{ color: '#000' }}>Categoría:</label>
                                    </div>
                                    <div className="col-sm-9">
                                    <input
                                        type="text"
                                        placeholder="Categoría"
                                        name="categoria"
                                        className="form-control"
                                        value={partido.categoria}
                                        readOnly
                                    />
                                </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <label style={{ color: '#000' }}>Fecha del Partido:</label>
                                    </div>
                                    <div className="col-sm-9">
                                    <DatePicker
                                        className="form-control"
                                        selected={new Date(partido.fecha)}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Fecha del Partido"
                                        readOnly
                                    />
                                </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <label style={{ color: '#000' }}>Hora del Partido:</label>
                                    </div>
                                    <div className="col-sm-9">
                                    <DatePicker
                                        className="form-control"
                                        selected={new Date(partido.hora)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Hora"
                                        dateFormat="h:mm aa"
                                        placeholderText="Hora del Partido"
                                        readOnly
                                    />
                                </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <label style={{ color: '#000' }}>Torneo:</label>
                                    </div>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            placeholder="Torneo"
                                            name="categoria"
                                            className="form-control"
                                            value={partido.torneo ? partido.torneo.nombre : ''}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ background: '#202124', color: '#000', minHeight: '93vh' }}>
                <div className="container" style={{ padding: '20px' }}>
                    &nbsp;
                    <h2 className="text-center" style={{ color: '#ffffff' }}>Lista de Sets de Partidos</h2>
                    &nbsp;
                    <Table striped bordered hover variant="grey" className="table-xl" style={{ background: "#d4d1d0", color: "#000" }}>
                        <thead>
                        <tr>
                            <th>ID Set</th>
                            <th>Número de Set</th>
                            <th>Hora de Inicio</th>
                            <th>Hora de Termino</th>
                            <th>Puntaje A</th>
                            <th>Puntaje B</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {partidoSets.map((set) => (
                            <tr key={set.idSetPartido}>
                                <td>{set.idSetPartido}</td>
                                <td>{set.numeroSet}</td>
                                <td>{new Date(set.horaInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                <td>{new Date(set.horaTermino).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                <td>{set.puntajeA}</td>
                                <td>{set.puntajeB}</td>
                                <td>
                                    <button
                                        className="btn btn-info"
                                        onClick={() => navigate(`/updateSetPartido/${partido.idPartido}/${set.idSetPartido}`)}
                                        style={{ backgroundColor: '#F4B205', color: '#000' }}
                                    >
                                        Ver Set de Partido
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <div className="row">
                        <div className="col-md-4">
                            <Link
                                to= {`/addSetsPartido/${partido.idPartido}`}
                                className="btn btn-primary mb-2"
                                style={{ backgroundColor: '#F4B205', color: '#000' }}
                            >
                                Agregar Set
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PerfilPartido;
