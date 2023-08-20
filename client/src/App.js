import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import Register from './components/RegisterUser'
import Dashboard from './components/Dashboard';
import Login from './components/LoginUser'

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <BrowserRouter>
        <Routes>
          {/* user routes */}
          <Route path='/' element={<Register/>} />
          <Route path='/login'element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/logout'/>

          {/* video game post routes */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
