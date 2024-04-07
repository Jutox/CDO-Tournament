import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { Route } from "react-router-dom";

export const SideBarDataJugador = [
  {
    title: "Inicio",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Contactanos",
    path: "/contactanos", // Make sure this path matches the one in Route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
];