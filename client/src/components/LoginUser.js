import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
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
        const errorResponse =err.response.data.errors;
        const errorArr = [];
        for(const key of Object.keys(errorResponse)){
          errorArr.push(errorResponse[key].message)
        }
        setErrors(errorArr);
      });
  }
  return(
    <div>
      <div className='loginPage'>
        <div className='loginForm'>
          <h1>Login Page</h1>
          <div>
            <form onSubmit={loginHandler}>
              {errors.map((err, index) => (
                <p key="{index}">{err}</p>
              ))}
              <div>
                <label>Email:</label>
                <input type='text'  name='email' value={userLogin.email} onChange={changeHandler}></input>
              </div>
              <div>
                <label>Password:</label>
                <input type='password' name='password' value={userLogin.password} onChange={changeHandler}></input>
              </div>
              <button>Login</button>
            </form>
            <Link to='/'>Don't have an account? Register here</Link>
          </div>
        </div>
      </div>
    </div>
  )
};
export default Login;