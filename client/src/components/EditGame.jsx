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

    const [validationErrors, setValidationErrors] = useState({});

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
        const errors = {};
        if (!GameName) {
            errors.GameName = 'Game name is required';
        }
        if (!Genre) {
            errors.Genre = 'Genre is required';
        }
        if (!DateCreated) {
            errors.DateCreated = 'Year created is required';
        }
        if (!Version) {
            errors.Version = 'Version is required';
        }
        if (!Console) {
            errors.Console = 'Console is required';
        }
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
        setValidationErrors({});
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
                        {validationErrors.GameName && <span>{validationErrors.GameName}</span>}
                    </p>
                    <p>
                        <label>Genre:</label>
                        <input type="text" name='Genre' value={Genre} onChange={(e) =>setGenre(e.target.value)}/>
                        {validationErrors.Genre && <span>{validationErrors.Genre}</span>}
                    </p>
                    <p>
                        <label>Year Created:</label>
                        <input type="number" name='DateCreated' value={DateCreated} onChange={(e) =>setDateCreated(e.target.value)}/>
                        {validationErrors.DateCreated && <span>{validationErrors.DateCreated}</span>}
                    </p>
                    <p>
                        <label>Version:</label>
                        <input type="text" name='GameName' value={Version} onChange={(e) =>setVersion(e.target.value)}/>
                        {validationErrors.Version && <span>{validationErrors.Version}</span>}
                    </p>
                    <p>
                        <label>Console:</label>
                        <input type="text" name='Console' value={Console} onChange={(e) =>setConsole(e.target.value)}/>
                        {validationErrors.Console && <span>{validationErrors.Console}</span>}
                    </p>
                    <input type="submit" value="Submit" className='btn btn-primary' />
        </form>
    </div>
  )
}

export default EditGame
