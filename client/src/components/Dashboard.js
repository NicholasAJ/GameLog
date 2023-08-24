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
      <table>
        <thead>
          <tr>
            <th>Game Name</th>
            <th>Genre</th>
            <th>Date Created</th>
            <th>Version</th>
            <th>Console</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game._id}>
              <Link to={`/games/${game._id}`}> {game.GameName} </Link>
              <td>{game.Genre}</td>
              <td>{game.DateCreated}</td>
              <td>{game.Version}</td>
              <td>{game.Console}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard;