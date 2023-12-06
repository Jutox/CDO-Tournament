import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PartidoService from '../services/PartidoService';
import TorneoService from '../services/TorneoService';

const UpdatePartido = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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
        torneo: '',
    });

    const [torneos, setTorneos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const partidoResponse = await PartidoService.getPartidoById(id);
                const torneosResponse = await TorneoService.getTorneos();

                setPartido(partidoResponse.data);
                setTorneos(torneosResponse.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPartido({ ...partido, [name]: value });
    };

    const handleDateChange = (date, field) => {
        setPartido({ ...partido, [field]: date });
    };

    const handleTorneoChange = (e) => {
        const torneoId = e.target.value;
        const selectedTorneo = torneos.find((torneo) => torneo.idTorneo === parseInt(torneoId));
        setPartido({ ...partido, torneo: selectedTorneo });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send updated partido data to the server
            await PartidoService.updatePartido(id, partido);

            // Redirect to the partido details page
            navigate(`/perfilpartido/${id}`);
        } catch (error) {
            console.error('Error updating partido:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ background: '#d4d1d0', color: '#000', minHeight: '93vh' }}>
            <div className="container" style={{ padding: '20px' }}>
                <h2 className="text-center" style={{ color: '#000' }}>
                    Actualizar Partido
                </h2>
                <div className="row justify-content-center">
                    <div className="card col-md-8" style={{ background: '#bcbdbe', color: '#000' }}>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {/* Render form fields */}
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
                                            onChange={handleInputChange}
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
                                            onChange={handleInputChange}
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
                                            onChange={handleInputChange}
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
                                            onChange={handleInputChange}
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
                                            onChange={handleInputChange}
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
                                            onChange={handleInputChange}
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
                                            onChange={handleInputChange}
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
                                            onChange={handleInputChange}
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
                                            selected={partido.fecha ? new Date(partido.fecha) : null}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Fecha del Partido"
                                            onChange={(date) => handleDateChange(date, 'fecha')}
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
                                            selected={partido.hora ? new Date(partido.hora) : null}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="Hora"
                                            dateFormat="h:mm aa"
                                            placeholderText="Hora del Partido"
                                            onChange={(date) => handleDateChange(date, 'hora')}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-sm-3">
                                        <label style={{ color: '#000' }}>Torneo:</label>
                                    </div>
                                    <div className="col-sm-9">
                                        <select
                                            className="form-control"
                                            name="torneo"
                                            value={partido.torneo ? partido.torneo.idTorneo : ''}
                                            onChange={handleTorneoChange}
                                        >
                                            <option value="">Seleccione un torneo</option>
                                            {torneos.map((torneo) => (
                                                <option key={torneo.idTorneo} value={torneo.idTorneo}>
                                                    {torneo.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ background: '#F4B205', color: '#fff' }}>
                                    Guardar Cambios
                                </button>
                                <Link
                                    to={`/perfilPartido/${partido.idPartido}`}
                                    className="btn btn-warning"
                                    style={{ background: '#F4B205', color: '#000' }}
                                >
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

export default UpdatePartido;
