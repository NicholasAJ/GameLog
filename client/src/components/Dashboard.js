import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = (props) => {
  const {games} = props;
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
  console.log(games);

  return(
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>

      <h2>List of Games</h2>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th style={{textAlign:"center"}}>Game Name</th>
            <th style={{textAlign:"center"}}>Genre</th>
            <th style={{textAlign:"center"}}>Date Created</th>
            <th style={{textAlign:"center"}}>Version</th>
            <th style={{textAlign:"center"}}>Console</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game._id}>
              <Link to={`/games/${game._id}`} style={{display: "flex",justifyContent:"center"}}> {game.GameName} </Link>
              <td style={{textAlign:"center"}}>{game.Genre}</td>
              <td style={{textAlign:"center"}}>{game.DateCreated}</td>
              <td style={{textAlign:"center"}}>{game.Version}</td>
              <td style={{textAlign:"center"}}>{game.Console}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard;