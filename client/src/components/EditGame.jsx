import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EditGame = () => {
    const { id } = useParams();
    const [GameName, setGameName] = useState();
    const [Genre, setGenre] = useState();
    const [DateCreated, setDateCreated] = useState();
    const [Version, setVersion] = useState();
    const [Console, setConsole] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/game/read/${id}`)
        .then(res => {
        setGameName(res.data.GameName);
        setGenre(res.data.Genre);
        setDateCreated(res.data.DateCreated);
        setVersion(res.data.Version);
        setConsole(res.data.Console);
        })
        .catch(err => console.log(err))
    }, [id])

    const updateGame = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/game/update/${id}`, {
        GameName,
        Genre,
        DateCreated,
        Version,
        Console
    })
        .then(res => {
            console.log(res);
            navigate('/dashboard');
        })
        .catch(err => {
            console.error("PUT error:", err);
            navigate('/dashboard');
        });
    };
  return (
    <div>
        <div style={{display: "flex",justifyContent:"space-around"}}>
            <h1>Edit Game</h1>
            <Link to={'/dashboard'}>Dashboard</Link>
        </div>
        <form onSubmit={updateGame}>
        <p>
                        <label>Name:</label>
                        <input type="text" name='GameName' value={GameName} onChange={(e) =>setGameName(e.target.value)} />
                    </p>
                    <p>
                        <label>Genre:</label>
                        <input type="text" name='Genre' value={Genre} onChange={(e) =>setGenre(e.target.value)}/>
                    </p>
                    <p>
                        <label>Year Created:</label>
                        <input type="number" name='DateCreated' value={DateCreated} onChange={(e) =>setDateCreated(e.target.value)}/>
                    </p>
                    <p>
                        <label>Version:</label>
                        <input type="text" name='GameName' value={Version} onChange={(e) =>setVersion(e.target.value)}/>
                    </p>
                    <p>
                        <label>Console:</label>
                        <input type="text" name='Console' value={Console} onChange={(e) =>setConsole(e.target.value)}/>
                    </p>
                    <input type="submit" value="Submit" className='btn btn-primary' />
        </form>
    </div>
  )
}

export default EditGame