import React, { useState, useEffect } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PartidoService from '../services/PartidoService';
import SetPartidoService from '../services/SetPartidoService';
import {Pagination, Table} from "react-bootstrap";
import EventoService from "../services/EventosService";
import jsPDF from "jspdf";

const PerfilSetPartido = () => {
    const { partidoId, setId } = useParams();
    const [setPartido, setSetPartido] = useState({
        numeroSet: 1,
        horaInicio: null,
        horaTermino: null,
        puntajeA: 0,
        puntajeB: 0,
        partido: '',
    });

    const [eventos, setEventos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        PartidoService.getPartidoById(partidoId)
            .then((response) => {
                setSetPartido({ ...setPartido, partido: response.data });
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        SetPartidoService.getSetPartidoById(setId)
            .then((response) => {
                const setPartidoData = response.data;

                // Convert time values to JavaScript Date objects if they exist
                const horaInicio = setPartidoData.horaInicio ? new Date(setPartidoData.horaInicio) : null;
                const horaTermino = setPartidoData.horaTermino ? new Date(setPartidoData.horaTermino) : null;

                setSetPartido({
                    ...setPartidoData,
                    horaInicio,
                    horaTermino,
                });
            })
            .catch((error) => {
                console.error('Error fetching set data:', error);
            });

        EventoService.getEventosByIdSet(setId)
            .then((response) => {
                setEventos(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

    }, []);

    const saveSetPartido = (e) => {
        e.preventDefault();


        // Llama al servicio para guardar el SetPartido
        SetPartidoService.createSetPartido(setPartido)
            .then((response) => {
                console.log(setPartido);
                console.log(response.data);
                navigate(`/perfilPartido/${partidoId}`);
            })
            .catch((error) => {
                console.error('Error creating SetPartido:', error);
                alert('Hubo un error al crear el SetPartido. Por favor, inténtalo nuevamente.');
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSetPartido({ ...setPartido, [name]: value });
    };

    const handleHourChange = (date, field) => {
        // Verificar si la fecha es válida
        if (!(date instanceof Date) || isNaN(date) || !isFinite(date)) {
            console.error("Fecha no válida");
            return;
        }

        // Verificar si la hora es válida
        if (isNaN(date.getHours()) || isNaN(date.getMinutes()) || isNaN(date.getSeconds())) {
            console.error("Hora no válida");
            return;
        }

        // Diferenciar entre horaInicio y horaTermino
        if (field === 'horaInicio') {
            setSetPartido({ ...setPartido, horaInicio: date });
        } else if (field === 'horaTermino') {
            setSetPartido({ ...setPartido, horaTermino: date });
        }
    };

    const refactorPuntajes = () => {
        let puntajea = 0;
        let puntajeb = 0;
        eventos.map((evento) => {
            if(evento.puntos > 0){
                puntajea=1+puntajea;
                console.log("+1 puntaje A")
            }else if(evento.puntos < 0){
                puntajeb=1+puntajeb;
                console.log("+1 puntaje B")
            }
        });
        setSetPartido({...setPartido, puntajeA: puntajea, puntajeB: puntajeb});
    }



    return (
        <div style={{ background: "#202124", color: "#000", minHeight: "93vh" }}>
            <div className="container" style={{ padding: '20px' }}>
                &nbsp;
                <h2 className="text-center" style={{ color: '#ffffff' }}>
                    Partido "{setPartido.partido.nombreCompeticion}"
                </h2>
                <h2 className="text-center" style={{ color: '#ffffff' }}>
                    Set Nro {setPartido.numeroSet}
                </h2>
                &nbsp;
                <div className="row justify-content-center" style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ maxWidth: "210px", width: "100%" }}>
                        <Link to={`/tableroPuntos/${partidoId}/${setId}`} className="btn btn-secondary" style={{ background: "#F4B205", color: "#000" }}>
                            JUGAR SET PARTIDO
                        </Link>
                    </div>
                </div>
                &nbsp;
                <div className="row justify-content-center">
                    <div className="card col-md-8" style={{ background: '#bcbdbe', color: '#000' }}>
                        <div className="card-body">
                            <div style={{ height: "70px", display: "flex", alignItems: "center" }}>
                                <Link to={`/perfilPartido/${partidoId}`} className="btn btn-secondary" style={{ background: "#6C757D", color: "#fff" }}>
                                    Volver
                                </Link>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <Link
                                    to={`/updateSetPartido/${partidoId}/${setId}`}
                                    className="btn btn-warning"
                                    style={{ background: "#F4B205", color: "#000", width: "auto" }}
                                >
                                    Actualizar
                                </Link>
                            </div>
                            <form>
                                <div className="form-group row mb-2" >
                                    <label className="col-sm-3 col-form-label" style={{ color: "#000" }}>Número de Set:</label>
                                    <div className="col-sm-9">
                                    <input
                                        type="number"
                                        name="numeroSet"
                                        value={setPartido.numeroSet}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                        disabled
                                    />
                                        &nbsp;
                                </div>
                                    <div className="form-group row mb-2" >
                                    <label className="col-sm-3 col-form-label" style={{ color: '#000' }}>Hora de Inicio:</label>
                                        <div className="col-sm-9">
                                            <DatePicker
                                                className="form-control"
                                                selected={setPartido.horaInicio}
                                                onChange={(date) => handleHourChange(date, 'horaInicio')}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                timeCaption="Hora"
                                                dateFormat="h:mm aa"
                                                placeholderText="Selecciona hora"
                                                style={{ background: '#e6e5e5', color: '#151414' }}
                                                disabled
                                            />
                                        </div>
                                </div>

                                    <div className="form-group row mb-2" >
                                        <label className="col-sm-3 col-form-label" style={{ color: '#000' }}>Hora de Término:</label>
                                        <div className="col-sm-9">
                                            <DatePicker
                                                className="form-control"
                                                selected={setPartido.horaTermino}
                                                onChange={(date) => handleHourChange(date, 'horaTermino')}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                timeCaption="Hora"
                                                dateFormat="h:mm aa"
                                                placeholderText="Selecciona hora"
                                                style={{ background: '#e6e5e5', color: '#151414' }}
                                                disabled
                                            />
                                        </div>
                                </div>

                                    <div className="form-group row mb-2" >
                                    <label className="col-sm-3 col-form-label" style={{ color: '#000' }}>Puntaje A:</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="number"
                                                name="puntajeA"
                                                value={setPartido.puntajeA}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                style={{ background: '#e6e5e5', color: '#151414' }}
                                                disabled
                                            />
                                        </div>
                                </div>
                                    <div className="form-group row mb-2" >
                                    <label className="col-sm-3 col-form-label" style={{ color: '#000' }}>Puntaje B:</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="number"
                                                name="puntajeB"
                                                value={setPartido.puntajeB}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                style={{ background: '#e6e5e5', color: '#151414' }}
                                                disabled
                                            />
                                        </div>
                                </div>
                                </div>
                            </form>
                        </div>
                    </div>
                        <div className="container" style={{ padding: '20px' }}>
                            <div style={{ height: "70px", display: "flex", alignItems: "center" }}>
                                <button
                                    onClick={refactorPuntajes}
                                    className="btn btn-warning"
                                    style={{ marginLeft: "auto" }}
                                >
                                    Resetear Puntajes
                                </button>

                            </div>
                            &nbsp;
                            <h2 className="text-center" style={{color: "#fff" }}>Lista de Eventos</h2>
                            &nbsp;
                            <Table striped bordered hover variant="grey" className="table-xl" style={{ background: "#d4d1d0", color: "#000" }}>
                            <thead>
                                <tr>
                                    <th>ID Evento</th>
                                    <th>Hora</th>
                                    <th>Tipo de Evento</th>
                                    <th>Puntos</th>
                                    <th>Orden de Servicio</th>
                                    <th>Ronda de Servicio</th>
                                    <th>Nombre Jugador</th>
                                    <th>Equipo</th>
                                </tr>
                                </thead>
                                <tbody>
                                {eventos.map((evento) => (
                                    <tr key={evento.idEvento}>
                                        <td>{evento.idEvento}</td>
                                        <td>{new Date(evento.hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                        <td>{evento.tipo}</td>
                                        <td>{evento.puntos}</td>
                                        <td>{evento.ordenServicio}</td>
                                        <td>{evento.rondaServicio}</td>
                                        <td>{evento.jugadorPartido.jugador.nombres}</td>
                                        <td>{evento.jugadorPartido.listaJugadoresPartido.equipo.nombreEquipo}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <div className="row">
                                <div className="col-md-4">
                                    <Link
                                        to= {`/addEventoForm/${partidoId}/${setId}`}
                                        className="btn btn-primary mb-2"
                                        style={{ backgroundColor: '#F4B205', color: '#000' }}
                                    >
                                        Agregar Evento
                                    </Link>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilSetPartido;
