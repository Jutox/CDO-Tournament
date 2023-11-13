import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { Route } from "react-router-dom";

export const SideBarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Administrar Entrenamientos",
    path: "/jugadores", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Administrar Eventos",
    path: "/eventos", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Estadisticas Jugadores",
    path: "/estadisticaJugadores", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Administrar Jugadores",
    path: "/jugadores", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Ingresar Nuevo Jugador",
    path: "/addJugador", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Contactanos",
    path: "/jugadores", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
];