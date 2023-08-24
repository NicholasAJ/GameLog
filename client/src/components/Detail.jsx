import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
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
    <div>
        <h1>{game.GameName}</h1>
        <div>
        <p>Genre: {game.Genre} </p> 
        <p>Date Created: {game.DateCreated}</p>
        <p>Version: {game.Version} </p>
        <p>Console: {game.Console} </p>
        </div>
    </div>
  )
}

export default Detail