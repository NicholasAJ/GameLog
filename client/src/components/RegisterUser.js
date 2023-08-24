import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
const Register = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  })
  const [errors, setErrors] = useState([]);

  const changeHandler = (e) => {
    setUser({...user, [e.target.name]:e.target.value})
  }

  const submitHandler = (e) =>{
    console.log('register working?')
    e.preventDefault();
    axios.post('http://localhost:8000/api/register', user, {withCredentials:true})
      .then((res) => {
        console.log(res);
        navigate('/dashboard')
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      })
  }
  return(
    <div>
      <h1>Register User</h1>
      <form onSubmit={submitHandler}>
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key].message}</p>
          ))}
        <div>
          <label>First Name:</label>
          <input type='text' onChange={changeHandler} value={user.firstName} name='firstName'/>
          { errors.firstName ?
            <p>{errors.firstName.message}</p> 
            :null}
        </div>

        <div>
          <label>Last Name:</label>
          <input type='text' onChange={changeHandler} value={user.lastName} name='lastName'/>
          { errors.lastName ?
            <p>{errors.lastName.message}</p> 
            :null}
        </div>

        <div>
          <label>Username:</label>
          <input type='text' onChange={changeHandler} value={user.username} name='username'/>
          { errors.username ?
            <p>{errors.username.message}</p> 
            :null}
        </div>

        <div>
          <label>Email:</label>
          <input type='text' onChange={changeHandler} value={user.email} name='email'/>
          { errors.email ?
            <p>{errors.email.message}</p> 
            :null}
        </div>

        <div>
          <label>Password</label>
          <input type='password' onChange={changeHandler} value={user.password} name='password'/>
          {/* { errors.password ?
            <p>{errors.password.message}</p> 
            :null} */}
        </div>

        <div>
          <label>ConfirmPassword</label>
          <input type='password' onChange={changeHandler} value={user.confirmPassword} name='confirmPassword'/>
          {/* { errors.confirmPassword ?
            <p>{errors.password.message}</p> 
            :null} */}
        </div>
        <button type='submit'>Register</button>
      </form>
      <Link to='/login'>Already have an account? Login here!</Link>
    </div>
  )};

export default Register;