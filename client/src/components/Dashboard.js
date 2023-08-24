import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = (props) => {
  const {games, setGames} = props;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/game/all')
      .then(res => {
        setGames(res.data);
      })
      .catch(err => console.log(err));
  }, [setGames]);

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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Dashboard</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '1rem' }}>
          <div></div>
        <button onClick={logout} className='btn btn-danger' style={{marginTop : "-55px", height: "50%"}}>Logout</button>
        </div>
      </div>
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
      <Link to='/games/create' className='btn btn-primary'> Create Game </Link>
    </div>
  )
}

export default Dashboard;