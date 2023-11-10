import React, { useEffect, useState } from 'react';
import EmpleadoService from '../services/EmpleadoService';
import { Link } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';

export const AdministrarEntrenamientos = () => {
    const [empleados, setEmpleados] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchCargo, setSearchCargo] = useState('');
    const [searchContrato, setSearchContrato] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [empleadosPerPage] = useState(10);

    useEffect(() => {
        EmpleadoService.getEmpleados().then((response) => {
            setEmpleados(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const filteredEmpleados = empleados.filter((empleado) => {
        return (
            empleado.nombres.toLowerCase().includes(searchName.toLowerCase()) &&
            empleado.cargo.tipoCargo.toLowerCase().includes(searchCargo.toLowerCase()) &&
            empleado.contrato.tipoContrato.toLowerCase().includes(searchContrato.toLowerCase())
        );
    });

    const indexOfLastEmpleado = currentPage * empleadosPerPage;
    const indexOfFirstEmpleado = indexOfLastEmpleado - empleadosPerPage;
    const currentEmpleados = filteredEmpleados.slice(indexOfFirstEmpleado, indexOfLastEmpleado);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ background: "#d4d1d0", color: "#000", minHeight: "93vh" }}>
            <div className="container" style={{ padding: "20px" }}>
                <h2 className="text-center">Lista de Empleados</h2>
                <div className="row">
                    <div className="col-md-4">
                        <input
                            type="text"
                            placeholder="Buscar por nombre"
                            onChange={(e) => setSearchName(e.target.value)}
                            className="form-control mb-3"
                            style={{ background: "#bcbdbe", color: "#151414" }}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            placeholder="Buscar por cargo"
                            onChange={(e) => setSearchCargo(e.target.value)}
                            className="form-control mb-3"
                            style={{ background: "#bcbdbe", color: "#151414" }}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            placeholder="Buscar por contrato"
                            onChange={(e) => setSearchContrato(e.target.value)}
                            className="form-control mb-3"
                            style={{ background: "#bcbdbe", color: "#151414" }}
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <Table striped bordered hover variant="grey" className="table-xl" >
                        <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Correo</th>
                            <th>Cargo</th>
                            <th>Contrato</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentEmpleados.map((empleado) => (
                            <tr key={empleado.id}>
                                <td>{empleado.nombres}</td>
                                <td>{empleado.apellidos}</td>
                                <td>{empleado.correo}</td>
                                <td>{empleado.cargo.tipoCargo}</td>
                                <td>{empleado.contrato.tipoContrato}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        {[...Array(Math.ceil(filteredEmpleados.length / empleadosPerPage)).keys()].map((number) => (
                            <Pagination.Item key={number + 1} onClick={() => paginate(number + 1)} active={number + 1 === currentPage}>
                                {number + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/" className="btn btn-primary mb-2" style={{ backgroundColor: "#F4B205",  color: "#000" }}>
                            Agregar Cargo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdministrarEntrenamientos;