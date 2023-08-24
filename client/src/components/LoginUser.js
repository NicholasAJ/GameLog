import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [userLogin, setUserLogin] = useState({
    email:'',
    password:'',
  })
  const changeHandler = (e) => {
    setUserLogin({...userLogin, [e.target.name]:e.target.value})
  }

  const loginHandler = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/login', userLogin, {withCredentials:true})
      .then((res) => {
        console.log(res);
        navigate('/dashboard')
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  }
  return(
    <div>
      <h1>Login Page</h1>
      <div>
        <form onSubmit={loginHandler}>
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key].message}</p>
          ))}
          <div>
            <label>Email:</label>
            <input type='text'  name='email' value={userLogin.email} onChange={changeHandler}></input>
            { errors.email ?
              <p>{errors.email.message}</p>
            :null}
          </div>
          <div>
            <label>Password:</label>
            <input type='password' name='password' value={userLogin.password} onChange={changeHandler}></input>
            { errors.password ?
            <p>{errors.password.message}</p> 
            :null}
          </div>
          <button>Login</button>
        </form>
        <Link to='/'>Don't have an account? Register here</Link>
      </div>
    </div>
  )
};
export default Login;