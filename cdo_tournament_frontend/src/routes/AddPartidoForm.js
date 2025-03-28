import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TorneoService from '../services/TorneoService';
import PartidoService from '../services/PartidoService';
import JugadorPartidoService from '../services/ListaJugadoresPartidoService';
import EquipoService from "../services/EquipoService";
const AddPartidoForm = () => {
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

    const [listaJugadoresPartidoCasa, setListaJugadoresPartidoCasa] = useState({
        equipo: null,
        partido: null,
    });

    const [listaJugadoresPartidoVisita, setListaJugadoresPartidoVisita] = useState({
        equipo: null,
        partido: null,
    });



    const [equipos, setEquipos] = useState([]);
    const [partidos, setPartidos] = useState([]);
    const [torneos, setTorneos] = useState([]);
    const [partidoLista, setPartidoLista] = useState('');

    const [selectedEquipoCasa, setSelectedEquipoCasa] = useState();
    const [selectedEquipoVisita, setSelectedEquipoVisita] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        TorneoService.getTorneos()
            .then((response) => {
                setTorneos(response.data);
            })
            .catch((error) => {
                console.error('Error fetching tournaments:', error);
            });

        EquipoService.getEquipos()
            .then((response) => {
                setEquipos(response.data);
            })
            .catch((error) => {
                console.error('Error fetching teams:', error);
            });

        PartidoService.getPartidos()
            .then((response) => {
                setPartidos(response.data);
            })
            .catch((error) => {
                console.error('Error fetching matches:', error);
            });
    }, []);

    const savePartido = (e) => {
        e.preventDefault();

        if (
            !partido.nombreCompeticion ||
            !partido.ciudad ||
            !partido.fecha ||
            !partido.hora ||
            !partido.torneo
        ) {
            alert('Todos los campos obligatorios deben ser llenados. Por favor, completa el formulario.');
            return;
        }

        PartidoService.createPartido(partido)
            .then((response) => {
                // Update the partido details for casa and visita
                const updatedListaJugadoresPartidoCasa = { ...listaJugadoresPartidoCasa, partido: response.data };
                const updatedListaJugadoresPartidoVisita = { ...listaJugadoresPartidoVisita, partido: response.data };

                // Save casa and visita player lists
                return Promise.all([
                    JugadorPartidoService.createListaJugadoresPartido(updatedListaJugadoresPartidoCasa),
                    JugadorPartidoService.createListaJugadoresPartido(updatedListaJugadoresPartidoVisita),
                ]);
            })
            .then(([responseCasa, responseVisita]) => {
                console.log('Casa players saved:', responseCasa.data);
                console.log('Visita players saved:', responseVisita.data);

                setPartidoLista(partido.nombreCompeticion);
                navigate('/partidos');
            })
            .catch((error) => {
                console.error('Error saving partido or players:', error);
                alert('La captura de datos tuvo un error. Por favor, intenta nuevamente.');
            });
    };


    const saveListaJugadoresPartidoCasa = (e) => {
        e.preventDefault();

        JugadorPartidoService.createListaJugadoresPartido(listaJugadoresPartidoCasa)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                alert('Error al capturar datos. Por favor, inténtalo nuevamente.');
            });

    };

    const saveListaJugadoresPartidoVisita = (e) => {
        e.preventDefault();

        JugadorPartidoService.createListaJugadoresPartido(listaJugadoresPartidoVisita)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                alert('Error al capturar datos. Por favor, inténtalo nuevamente.');
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPartido({ ...partido, [name]: value });
    };

    const handleDateChange = (date, field) => {
        setPartido({ ...partido, [field]: date });
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

        // Conservar la fecha y hora en el estado
        setPartido({ ...partido, [field]: date });
    };

    const handleTorneoChange = (e) => {
        const torneoId = e.target.value;
        const selectedTorneo = torneos.find((torneo) => torneo.idTorneo === parseInt(torneoId));
        setPartido({ ...partido, torneo: selectedTorneo });
    };

    const handleEquipoChangeCasa = (e) => {
        const equipoId = e.target.value;
        setSelectedEquipoCasa(e.target.value);
        const selectedEquipo = equipos.find((equipo) => equipo.idEquipo === parseInt(equipoId));
        setListaJugadoresPartidoCasa({...listaJugadoresPartidoCasa , equipo: selectedEquipo });
        setSelectedEquipoCasa(selectedEquipo);
        console.log(selectedEquipoCasa);
    };

    const handleEquipoChangeVisita = (e) => {
        const equipoId = e.target.value;
        setSelectedEquipoVisita(e.target.value);
        const selectedEquipo = equipos.find((equipo) => equipo.idEquipo === parseInt(equipoId));
        setListaJugadoresPartidoVisita({...listaJugadoresPartidoVisita , equipo: selectedEquipo });
        setSelectedEquipoVisita(selectedEquipo);
        console.log(selectedEquipoVisita);
    };


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
                    Agregar Partido
                </h2>
                &nbsp;
                <div className="row justify-content-center">
                    <div className="card col-md-8" style={{ background: '#bcbdbe', color: '#000' }}>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Nombre de la Competición:</label>
                                    <input
                                        type="text"
                                        placeholder="Nombre de la Competición"
                                        name="nombreCompeticion"
                                        className="form-control"
                                        value={partido.nombreCompeticion}
                                        onChange={handleInputChange}
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Ciudad:</label>
                                    <input
                                        type="text"
                                        placeholder="Ciudad"
                                        name="ciudad"
                                        className="form-control"
                                        value={partido.ciudad}
                                        onChange={handleInputChange}
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Código de País (ej: CH):</label>
                                    <input
                                        type="text"
                                        placeholder="Código de País"
                                        name="codigoPais"
                                        className="form-control"
                                        value={partido.codigoPais}
                                        onChange={handleInputChange}
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Recinto:</label>
                                    <input
                                        type="text"
                                        placeholder="Recinto"
                                        name="recinto"
                                        className="form-control"
                                        value={partido.recinto}
                                        onChange={handleInputChange}
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Fase:</label>
                                    <input
                                        type="text"
                                        placeholder="Fase"
                                        name="fase"
                                        className="form-control"
                                        value={partido.fase}
                                        onChange={handleInputChange}
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Número de Partido:</label>
                                    <input
                                        type="number"
                                        placeholder="Número de Partido"
                                        name="numeroPartido"
                                        className="form-control"
                                        value={partido.numeroPartido}
                                        onChange={handleInputChange}
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>División:</label>
                                    <input
                                        type="text"
                                        placeholder="División"
                                        name="division"
                                        className="form-control"
                                        value={partido.division}
                                        onChange={handleInputChange}
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Categoría:</label>
                                    <input
                                        type="text"
                                        placeholder="Categoría"
                                        name="categoria"
                                        className="form-control"
                                        value={partido.categoria}
                                        onChange={handleInputChange}
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Fecha del Partido:</label>
                                    <DatePicker
                                        className="form-control"
                                        selected={partido.fecha}
                                        onChange={(date) => handleDateChange(date, 'fecha')}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Selecciona fecha"
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Hora del Partido:</label>
                                    <DatePicker
                                        className="form-control"
                                        selected={partido.hora}
                                        onChange={(date) => handleHourChange(date, 'hora')}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Hora"
                                        dateFormat="h:mm aa"
                                        placeholderText="Selecciona hora"
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Torneo:</label>
                                    <select
                                        className="form-control"
                                        name="torneo"
                                        value={partido.torneo ? partido.torneo.idTorneo : ''}
                                        onChange={handleTorneoChange}
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    >
                                        <option value="">Seleccione un torneo</option>
                                        {torneos.map((torneo) => (
                                            <option key={torneo.idTorneo} value={torneo.idTorneo}>
                                                {torneo.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Equipo Casa:</label>
                                    <select
                                        className="form-control"
                                        name="equipoCasa"
                                        value={listaJugadoresPartidoCasa.equipo ? listaJugadoresPartidoCasa.equipo.idEquipo : ''}
                                        onChange={handleEquipoChangeCasa}
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    >
                                        <option value="">Seleccione un equipo</option>
                                        {equipos.map((equipo) => (
                                            <option key={equipo.idEquipo} value={equipo.idEquipo}>
                                                {equipo.nombreEquipo}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group mb-2">
                                    <label style={{ color: '#000' }}>Equipo Visita:</label>
                                    <select
                                        className="form-control"
                                        name="equipoVisita"
                                        value={listaJugadoresPartidoVisita.equipo ? listaJugadoresPartidoVisita.equipo.idEquipo : ''}
                                        onChange={handleEquipoChangeVisita}
                                        style={{ background: '#e6e5e5', color: '#151414' }}
                                    >
                                        <option value="">Seleccione un equipo</option>
                                        {equipos.map((equipo) => (
                                            <option key={equipo.idEquipo} value={equipo.idEquipo}>
                                                {equipo.nombreEquipo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    className="btn btn-success"
                                    onClick={savePartido}
                                    style={{ background: '#F4B205', color: '#fff' }}
                                >
                                    Guardar
                                </button>
                                &nbsp;&nbsp;&nbsp;
                                <Link to="/partidos" className="btn btn-danger" style={{ background: '#dc3545', color: '#fff' }}>
                                    Cancelar
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPartidoForm;
