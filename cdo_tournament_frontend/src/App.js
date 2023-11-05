import React from 'react';
import logo from './logo.svg';
import './App.css';
//import ListJugadoresComponent from './Components/ListJugadoresComponent';
import NavBar from './Components/NavBar';
import MainPage from "./Components/MainPage";
import {BrowserRouter, Route, Routes} from 'react-router-dom'


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
