import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom';
import axios from 'axios'

const Detail = (props) => {
    const [game, setGame] = useState({});
    const {id} = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8000/api/game/read/${id}`)
            .then(res=> {
                console.log(res.data);
                setGame(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>{game.GameName}</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '1rem' }}>
                <div></div> {/* Left empty to center-align the header */}
                <Link to={'/dashboard'} style={{marginTop : "-55px"}}>Dashboard</Link>
            </div>
        <div>
          <p>Genre: {game.Genre} </p> 
          <p>Date Created: {game.DateCreated}</p>
          <p>Version: {game.Version} </p>
          <p>Console: {game.Console} </p>
        </div>
        <div>
            <Link to={`/games/edit/${game._id}`} className='btn btn-primary'>Edit Game</Link>
        </div>
    </div>
  )
}

export default Detail