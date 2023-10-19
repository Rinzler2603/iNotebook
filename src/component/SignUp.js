import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({name:'',email:'',password:''})
  let navigate = useNavigate();

  const { showAlert } = props

  const handleChange = (e)=> {
    setCredentials({...credentials, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log({email:credentials.email, password:credentials.password})
    const res = await fetch("http://192.168.0.105:5000/api/auth/register",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:credentials.name, email:credentials.email, password :credentials.password})
    });
    const json = await res.json();
    if(json.success){
      localStorage.setItem('token',json.authToken) 
      showAlert("Registered Successfully", "primary")
      navigate('/')
    }else{
      console.log(json)
      showAlert("Invalid Credentials", "danger")
      console.log(json)
    }
  }



  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" className="" id="name" value={credentials.name} onChange={handleChange} placeholder="Name"/>
        </div>
        <div className="form-group">
          <input type="email" className="" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} onChange={handleChange}/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <input type="password" className="" id="password" placeholder="Password" onChange={handleChange} value={credentials.password}/>
        </div>
        
        <div className="form-group text-center">
          {/* <button type="submit" className="btn btn-outline-warning " >Log in</button> */}
          {/* <button type="submit" className="login-but btn " >Log in</button> */}
          <button style={{visibility: credentials.password.length<5?"hidden":"visible"}} type="submit" className="btn login-but">SignUp</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
