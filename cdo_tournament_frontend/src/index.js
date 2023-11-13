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
import Products from "./routes/Contactanos";
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
        path: "/",
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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
