import React, { useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";

const Login = (props) => {

  const [credentials, setCredentials] = useState({email:'',password:''})
  let navigate = useNavigate();
  const { showAlert } = props;

  const handleChange = (e)=> {
    console.log(e.target.id)
    setCredentials({...credentials, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

//  Authnetication
    console.log({email:credentials.email, password:credentials.password})
    const res = await fetch("http://192.168.0.105:5000/api/auth/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:credentials.email,password :credentials.password})
    });
    const json = await res.json();

    if(json.success){
      showAlert("Successfully logged in", "primary")
      console.log(json.authToken)
      localStorage.setItem('token', json.authToken)
      navigate('/')
    }
    else{
      showAlert("Invalid credentials", "danger")
    }
  }


  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <div className="form-group text-center">
          <h1>Login</h1>
          </div>
          <br />

        <div className="form-group">
          <input type="email" className="" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange = {handleChange} value={credentials.email}/>
   
        </div>

        <div className="form-group">
          <input type="password" className="" id="password" onChange = {handleChange} value={credentials.password} placeholder="Password"/>
        </div>

        <br />
        
        <div className="form-group text-center">
          {/* <button type="submit" className="btn btn-outline-warning " >Log in</button> */}
          <button type="submit" className="login-but btn " >Log in</button>
        </div>
      </form>
    </div>
  )
}

export default Login
