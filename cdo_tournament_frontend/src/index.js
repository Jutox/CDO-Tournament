import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./routes/Home";
import Reports from "./routes/Reports";
import Navbar from "./components/Navbar";
import AdministrarJugadores from './routes/AdministrarJugadores';
import AdministrarTorneos from './routes/AdministrarTorneos';
import AddTorneoForm from './routes/AddTorneoForm';
import ActualizarJugadorForm from './routes/ActualizarJugadorForm';
import EstadisticaJugadores from './routes/EstadisticaJugadores';
import AdministrarPartidos from './routes/AdministrarPartidos';
import AddPartidoForm from './routes/AddPartidoForm';
import AdministrarEquipos from './routes/AdministrarEquipos';
import AddEquipoForm from './routes/AddEquipoForm';
import Contactanos from './routes/Contactanos';
import AddJugadorForm from './routes/AddJugadorForm';
import AministrarListaJugadoresPartidos from './routes/AministrarListaJugadoresPartidos';
import AddListaJugadorPartido from './routes/AddListaJugadorPartidoForm';
import AdministrarJugadorPartido from "./routes/AdministrarJugadorPartido";
import AddJugadorPartidoForm from './routes/AddJugadorPartidoForm';
import AdministrarSetPartido from "./routes/AdministrarSetPartido";
import AddSetPartidoForm from './routes/AddSetPartidoForm';
import AdministrarEvento from "./routes/AdministrarEvento";
import AddEventoForm from './routes/AddEventoForm';
import EstadisticaJugadorIndividual from './routes/EstadisticaJugadorIndividual';
import TableroPuntos from './routes/TableroPuntos';
import EstadisticaPersonal from './routes/EstadisticaPersonal';
import PerfilJugador from './routes/PerfilJugador';
import PerfilPartido from './routes/PerfilPartido';
import ActualizarPartidoForm from './routes/ActualizarPartidoForm';
import ActualizarSetPartido from "./routes/ActualizarSetPartido";
import PerfilSetPartido from "./routes/PerfilSetPartido";
import PerfilEquipo from "./routes/PerfilEquipo";
import LoginPage from "./routes/LoginPage";
import AddJugadorAEquipoForm from "./routes/AddJugadorAEquipoForm"
import AddJugadorPartidoEquipoForm from "./routes/AddJugadorPartidoEquipoForm"
import PerfilTorneo from "./routes/PerfilTorneo";
import ActualizarTorneoForm from "./routes/ActualizarTorneoForm"
import "./App.css";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route element={<AppLayout />}>
//       <Route path="/" element={<Home />} />
//       <Route path="/products" element={<Products />} />
//       <Route path="/reports" element={<Reports />} />
//     </Route>
//   )
// );

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/", // Add a forward slash here
        element: <LoginPage />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/contactanos",
        element: <Contactanos />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/jugadores", // Add a forward slash here
        element: <AdministrarJugadores />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/addJugador", // Add a forward slash here
        element: <AddJugadorForm />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/updateJugador/:id", // Add a forward slash here
        element: <ActualizarJugadorForm />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/estadisticaJugadores", // Add a forward slash here
        element: <EstadisticaJugadores />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/partidos", // Add a forward slash here
        element: <AdministrarPartidos />, // Assuming you have a component named Empleados
      },
      {
        path: "/addPartido", // Add a forward slash here
        element: <AddPartidoForm />, // Assuming you have a component named Empleados
      },
      {
        path: "/torneos", // Add a forward slash here
        element: <AdministrarTorneos />, // Assuming you have a component named Empleados
      },
      {
        path: "/equipos", // Add a forward slash here
        element: <AdministrarEquipos />, // Assuming you have a component named Empleados
      },
      {
        path: "/addEquipo", // Add a forward slash here
        element: <AddEquipoForm />, // Assuming you have a component named Empleados
      },
      {
        path: "/addTorneo", // Add a forward slash here
        element: <AddTorneoForm />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/listaJugadoresPartidos", // Add a forward slash here
        element: <AministrarListaJugadoresPartidos />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/addListaJugadorPartido", // Add a forward slash here
        element: <AddListaJugadorPartido />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/JugadorPartido", // Add a forward slash here
        element: <AdministrarJugadorPartido />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/addJugadorPartidoForm", // Add a forward slash here
        element: <AddJugadorPartidoForm />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/setsPartido", // Add a forward slash here
        element: <AdministrarSetPartido />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/addSetsPartido/:id", // Add a forward slash here
        element: <AddSetPartidoForm />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/eventos", // Add a forward slash here
        element: <AdministrarEvento />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/addEventoForm/:partidoId/:setId", // Add a forward slash here
        element: <AddEventoForm />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/estadisticaJugadorIndividual", // Add a forward slash here
        element: <EstadisticaJugadorIndividual />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/tableroPuntos/:partidoId/:setId", // Add a forward slash here
        element: <TableroPuntos />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/estadisticaPersonal", // Add a forward slash here
        element: <EstadisticaPersonal />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/perfilJugador/:id", // Add a forward slash here
        element: <PerfilJugador />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/perfilPartido/:id", // Add a forward slash here
        element: <PerfilPartido />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/updatePartido/:id", // Add a forward slash here
        element: <ActualizarPartidoForm />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/updateSetPartido/:partidoId/:setId", // Add a forward slash here
        element: <ActualizarSetPartido />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/perfilSetPartido/:partidoId/:setId", // Add a forward slash here
        element: <PerfilSetPartido />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/perfilEquipo/:id", // Add a forward slash here
        element: <PerfilEquipo />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/perfilAddJugadorAEquipo/:idEquipo", // Add a forward slash here
        element: <AddJugadorAEquipoForm />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/perfilAddJugadorPartidoEquipoForm/:id", // Add a forward slash here
        element: <AddJugadorPartidoEquipoForm />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/perfilTorneo/:id", // Add a forward slash here
        element: <PerfilTorneo />, // Assuming you have a component named Empleados AdministrarTorneos
      },
      {
        path: "/updateTorneo/:id", // Add a forward slash here
        element: <ActualizarTorneoForm />, // Assuming you have a component named Empleados AdministrarTorneos
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
