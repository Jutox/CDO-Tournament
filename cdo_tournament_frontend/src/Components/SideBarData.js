import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { Route } from "react-router-dom";
import {IoIosAnalytics, IoIosPerson} from "react-icons/io";

export const SideBarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Jugadores",
    path: "/jugadores", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosBody  />,
    cName: "nav-text",
  },
  {
    title: "Equipos",
    path: "/equipos", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPeople />,
    cName: "nav-text",
  },
  {
    title: "Partidos",
    path: "/partidos", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosAperture />,
    cName: "nav-text",
  },
  {
    title: "Torneos",
    path: "/torneos", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosTrophy />,
    cName: "nav-text",
  },
  {
    title: "Individual",
    path: "/estadisticaJugadorIndividual", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosStats />,
    cName: "nav-text",
  },
  {
    title: "Contactanos",
    path: "/contactanos", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
];