import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, {useState} from 'react';
import axios from 'axios'
import Register from './components/RegisterUser'
import Dashboard from './components/Dashboard';
import Login from './components/LoginUser'
import CreateGame from './components/CreateGame';
import Detail from './components/Detail';

function App() {
  const [games, setGames] = useState([]);


  return (
      <div className="App">

          <BrowserRouter>
              <Routes>
              <Route path='/' element={<Register/>} />
              <Route path='/login'element={<Login/>}/>
              <Route path='/dashboard' element={<Dashboard games={games} />}/>
              <Route path='/games/create' element={<CreateGame games={games} setGames={setGames} />} />
              <Route path="/games/:id" element={<Detail/>} />
              <Route path='/logout'/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
