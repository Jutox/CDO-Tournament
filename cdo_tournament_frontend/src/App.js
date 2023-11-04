import React from 'react';
import logo from './logo.svg';
import './App.css';
//import ListJugadoresComponent from './Components/ListJugadoresComponent';
import NavBar from './Components/NavBar';
import {BrowserRouter, Route, Routes} from 'react-router-dom'


function App() {
  return (
    <div>
      <BrowserRouter>
          <div className='container'>
            <Routes>
              <Route exact path = '/' element = {<NavBar />}></Route>
            </Routes>
          </div>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
