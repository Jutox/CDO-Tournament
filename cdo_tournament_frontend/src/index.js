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
import Products from "./routes/Products";
import Home from "./routes/Home";
import Reports from "./routes/Reports";
import Navbar from "./components/Navbar";
import AdministrarJugadores from './routes/AdministrarJugadores';
import AdministrarEventos from './routes/AdministrarEventos';
import ActualizarJugadorForm from './routes/ActualizarJugadorForm';
import EstadisticaJugadores from './routes/EstadisticaJugadores';
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
        path: "/products",
        element: <Products />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/jugadores", // Add a forward slash here
        element: <AdministrarJugadores />, // Assuming you have a component named Empleados AdministrarEventos
      },
      {
        path: "/addJugador", // Add a forward slash here
        element: <AddJugadorForm />, // Assuming you have a component named Empleados AdministrarEventos
      },
      {
        path: "/updateJugador/:id", // Add a forward slash here
        element: <ActualizarJugadorForm />, // Assuming you have a component named Empleados AdministrarEventos
      },
      {
        path: "/estadisticaJugadores", // Add a forward slash here
        element: <EstadisticaJugadores />, // Assuming you have a component named Empleados AdministrarEventos
      },
      {
        path: "/eventos", // Add a forward slash here
        element: <AdministrarEventos />, // Assuming you have a component named Empleados
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
