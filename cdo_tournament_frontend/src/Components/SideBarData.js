import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { Route } from "react-router-dom";

export const SideBarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Administrar Jugadores",
    path: "/jugadores", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Administrar Partidos",
    path: "/partidos", // Make sure this path matches the one in Route
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
    title: "Administrar Torneos",
    path: "/torneos", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Administrar Equipos",
    path: "/equipos", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Administrar Listas",
    path: "/listaJugadoresPartidos", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Administrar JugadorPartidos",
    path: "/JugadorPartido", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Administrar Set Partido",
    path: "/setsPartido", // Make sure this path matches the one in Route
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
    title: "estadistica Individual",
    path: "/estadisticaJugadorIndividual", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Tablero Puntos",
    path: "/tableroPuntos", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "EstadisticaPersonal",
    path: "/estadisticaPersonal", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Contactanos",
    path: "/contactanos", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
];