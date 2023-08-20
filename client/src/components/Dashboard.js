import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = (props) => {
  const navigate = useNavigate();
  const logout = () => {
    axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
      .then((res) => {
        console.log(res);
        navigate('/login')
        })
      .catch((err) => {
        console.log(err);
      });
  };

  return(
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard;