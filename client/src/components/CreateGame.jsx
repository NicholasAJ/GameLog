import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const CreateGame = (props) => {
    const navigate = useNavigate();
    const {games, setGames} = props;
    const [GameName, setGameName] = useState("");
    const [Genre, setGenre] = useState("");
    const [DateCreated, setDateCreated] = useState("");
    const [Version, setVersion] = useState("");
    const [Console, setConsole] = useState("");
    const [errors, setErrors] = useState([]);
    const onSubmitHandler = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/game/create', {
            GameName,
            Genre,
            DateCreated,
            Version,
            Console
        })
        .then(response => {
            console.log("API Response:", response.data);
            setGames([...games, response.data]); // Use the updateGames function from props
            // Reset form fields after successful submission
            // setGameName("");
            // setGenre("");
            // setDateCreated("");
            // setVersion("");
            // setConsole("");
            navigate('/dashboard')
        })
        .catch(err => {
            console.log(err);
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for(const key of Object.keys(errorResponse)){
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        })
    };
    

  return (
    <div>
        <h1>New Video Game</h1>
        <div>
            <form onSubmit={onSubmitHandler}>
                <p>
                {errors.map((err, index) => (
                    <p key="{index}">{err}</p>
                ))}
                        <label>Name:</label>
                        {/* When the user types in this input, our onChange synthetic event 
                            runs this arrow function, setting that event's target's (input) 
                            value (what's typed into the input) to our updated state   */}
                        <input type="text" name='GameName' value={GameName} onChange={(e) =>setGameName(e.target.value)} />
                    </p>
                    <p>
                        <label>Genre:</label>
                        <input type="text" name='Genre' value={Genre} onChange={(e) =>setGenre(e.target.value)}/>
                    </p>
                    <p>
                        <label>Date Created:</label>
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
                    <input type="submit" value="Create Game" />
            </form>
        </div>
    </div>
  )
}

export default CreateGame