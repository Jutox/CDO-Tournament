import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PartidoService from '../services/PartidoService';
import SetPartidoService from '../services/SetPartidoService';
import ListaJugadoresPartidoService from '../services/ListaJugadoresPartidoService';
import EquipoService from '../services/EquipoService';
import {Pagination, Table} from "react-bootstrap";
import JugadorPartidoService from "../services/JugadorPartidoService";
import TorneoService from "../services/TorneoService";

const PerfilPartido = () => {
    const { id } = useParams();
    const [listaJugadoresPartido, setListaJugadoresPartido] = useState([]);
    const [jugadoresPartido, setJugadorPartido] = useState([]);
    const [listasJugadores, setListasJugadores] = useState([]);
    const [listaJugadoresPartidoCasa, setListaJugadoresPartidoCasa] = useState([]);
    const [listaJugadoresPartidoVisita, setListaJugadoresPartidoVisita] = useState([]);
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
    const [binary, setBinary]  = useState(false);

    const [equipos, setEquipos] = useState(0);
    const [equiposId, setEquiposId] = useState(0);



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

        ListaJugadoresPartidoService.getListasJugadoresPartido()
            .then((response) => {
                setListasJugadores(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        JugadorPartidoService.getJugadoresPartido()
            .then((response) => {
                setJugadorPartido(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        ListaJugadoresPartidoService.getListasJugadoresPartido()
            .then((response) => {
                // Map over the response data and create promises for the matches that meet the condition
                const promises = response.data.map((eventos) => {
                    if (eventos && eventos.partido && eventos.partido.idPartido != null && eventos.partido.idPartido == parseInt(id)) {
                        return eventos.equipo.nombreEquipo; // Return the team name if the condition is met
                    }
                    return null; // Return null for events that don't match the condition
                });

                // Filter out the nulls and resolve all promises
                return Promise.all(promises.filter(nombre => nombre !== null));
            })
            .then(equiposNombres => {
                // Update the state with all filtered team names
                setEquipos(equiposNombres);
            })

        ListaJugadoresPartidoService.getListasJugadoresPartido()
            .then((response) => {
                // Map over the response data and create promises for the matches that meet the condition
                const promises = response.data.map((eventos) => {
                    if (eventos && eventos.partido && eventos.partido.idPartido != null && eventos.partido.idPartido == parseInt(id)) {
                        return eventos.equipo.idEquipo; // Return the team name if the condition is met
                    }
                    return null; // Return null for events that don't match the condition
                });

                // Filter out the nulls and resolve all promises
                return Promise.all(promises.filter(nombre => nombre !== null));
            })
            .then(equiposIds => {
                // Update the state with all filtered team names
                setEquiposId(equiposIds);
            })


    }, [id]);

    useEffect(() => {
        const filteredJugadores = jugadoresPartido.map((eventos) => {
            console.log("holaaa"); // Preserve the console.log statement
            if (
                eventos &&
                eventos.listaJugadoresPartido &&
                eventos.listaJugadoresPartido.partido !== null &&
                eventos.listaJugadoresPartido.equipo &&
                eventos.listaJugadoresPartido.equipo.idEquipo == parseInt(equiposId[0]) &&
                eventos.listaJugadoresPartido.partido.idPartido == parseInt(id)
            ) {
                return eventos;
            }
            return null; // Return null for items that don't meet the conditions
        }).filter((eventos) => eventos !== null); // Filter out null values

        console.log(filteredJugadores);
        setListaJugadoresPartidoCasa(filteredJugadores);
        console.log(listaJugadoresPartidoCasa);
    }, [jugadoresPartido, equiposId, id]);

    useEffect(() => {
        const filteredJugadores = jugadoresPartido.map((eventos) => {
            console.log("holaaa"); // Preserve the console.log statement
            if (
                eventos &&
                eventos.listaJugadoresPartido &&
                eventos.listaJugadoresPartido.partido !== null &&
                eventos.listaJugadoresPartido.equipo &&
                eventos.listaJugadoresPartido.equipo.idEquipo == parseInt(equiposId[1]) &&
                eventos.listaJugadoresPartido.partido.idPartido == parseInt(id)
            ) {
                return eventos;
            }
            return null; // Return null for items that don't meet the conditions
        }).filter((eventos) => eventos !== null); // Filter out null values

        console.log(filteredJugadores);
        setListaJugadoresPartidoVisita(filteredJugadores);
        console.log(listaJugadoresPartidoCasa);
    }, [jugadoresPartido, equiposId, id]);


    return (
        <div style={{ background: '#202124', color: '#000', minHeight: '100vh', padding: '20px' , paddingTop: '80px' }}>
            &nbsp;
            <h1 className="text-left" style={{color: '#F4B205'}}>
                CDO Tournament
            </h1>
            &nbsp;
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

            <div className="container" style={{ padding: '20px' }}>
                <div className="row">
                    <div className="col-md-6">
                        <div style={{ margin: '20px' }}>
                        <h2 className="text-center" style={{ color: '#ffffff' }}>{equipos[0]}</h2>
                        <div className="row justify-content-center">
                            <div className="col-md-6" style={{ textAlign: 'center' }}>
                                <Link
                                    to= {`/perfilAddJugadorPartidoEquipoForm/${id}/${equiposId[0]}`}

                                    className="btn btn-primary mb-2"
                                    style={{ backgroundColor: '#F4B205', color: '#000' }}
                                >
                                    Agregar Jugador a Partido
                                </Link>
                            </div>
                            <Table striped bordered hover variant="light" className="table-xl">
                                <thead>
                                <tr>
                                    <th>Jugador</th>
                                    <th>Número Camiseta</th>
                                    <th>Capitán</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listaJugadoresPartidoCasa.map((jugadorPartido) => (
                                    <tr key={jugadorPartido.idJugadorPartido}>
                                        <td>{jugadorPartido.jugador.nombres}</td>
                                        <td>{jugadorPartido.numeroCamiseta}</td>
                                        <td>{jugadorPartido.capitan ? "Sí" : "No"}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div style={{ margin: '20px' }}>
                            <h2 className="text-center" style={{ color: '#ffffff' }}>{equipos[1]}</h2>
                            <div className="row justify-content-center">
                                <div className="col-md-6" style={{ textAlign: 'center' }}>
                                    <Link
                                        to= {`/perfilAddJugadorPartidoEquipoForm/${id}/${equiposId[1]}`}
                                        className="btn btn-primary mb-2"
                                        style={{ backgroundColor: '#F4B205', color: '#000' }}
                                    >
                                        Agregar Jugador a Partido
                                    </Link>
                                </div>
                            <Table striped bordered hover variant="light" className="table-xl">
                                <thead>
                                <tr>
                                    <th>Jugador</th>
                                    <th>Número Camiseta</th>
                                    <th>Capitán</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listaJugadoresPartidoVisita.map((jugadorPartido) => (
                                    <tr key={jugadorPartido.idJugadorPartido}>
                                        <td>{jugadorPartido.jugador.nombres}</td>
                                        <td>{jugadorPartido.numeroCamiseta}</td>
                                        <td>{jugadorPartido.capitan ? "Sí" : "No"}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ background: '#202124', color: '#000', minHeight: '93vh' }}>
                <div className="container" style={{ padding: '20px' }}>
                    &nbsp;
                    <h2 className="text-center" style={{ color: '#ffffff' }}>Lista de Sets de Partidos</h2>
                    &nbsp;
                    <Table striped bordered hover variant="grey" className="table-xl" style={{ background: "#ffffff", color: "#000" }}>
                        <thead>
                        <tr>
                            <th>ID Set</th>
                            <th>Número de Set</th>
                            <th>Hora de Inicio</th>
                            <th>Hora de Término</th>
                            <th>{equipos[0]}</th>
                            <th>{equipos[1]}</th>
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
                                        onClick={() => navigate(`/perfilSetPartido/${partido.idPartido}/${set.idSetPartido}`)}
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
