import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import TorneoService from '../services/TorneoService';

export const PerfilTorneo = () => {
    const { id } = useParams();
    const [torneo, setTorneo] = useState({
        nombre: '',
        fechaInicio: '',
        fechaTermino: '',
        lugar: '',
    });

    useEffect(() => {
        // Fetch the tournament data when the component mounts
        TorneoService.getTorneoById(id)
            .then((response) => {
                setTorneo(response.data);
            })
            .catch((error) => {
                console.error(error);
                alert('La captura de datos tuvo un error. Por favor, intenta nuevamente.');
            });
    }, [id]);

    return (
        <div style={{ background: '#202124', color: '#000', minHeight: '100vh', padding: '20px' , paddingTop: '80px' }}>
            &nbsp;
            <h1 className="text-left" style={{color: '#F4B205'}}>
                CDO Tournament
            </h1>
            &nbsp;
            <h2 className="text-center" style={{ color: '#ffffff' }}>
                Detalles del Torneo
            </h2>
            &nbsp;
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{ background: '#bcbdbe', color: '#000' }}>
                        <div className="card-body">
                            <div style={{ height: "70px", display: "flex", alignItems: "center" }}>
                                <Link to="/torneos" className="btn btn-secondary" style={{ background: "#6C757D", color: "#fff" }}>
                                    Volver
                                </Link>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <Link
                                    to={`/updateTorneo/${id}`}
                                    className="btn btn-warning"
                                    style={{ background: "#F4B205", color: "#000", width: "auto" }}
                                >
                                    Actualizar
                                </Link>
                            </div>
                            <form>
                                {Object.keys(torneo).map((key) => (
                                    <div className="form-group row mb-2" key={key}>
                                        <label className="col-sm-2 col-form-label" style={{ color: "#000" }}>
                                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                                        </label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={torneo[key]}
                                                readOnly
                                                style={{ paddingLeft: '5px' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilTorneo;
