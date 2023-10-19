import React, { useState } from "react";

import {  
  BrowserRouter as Router,  
  Routes,  
  Route,  
}   
from 'react-router-dom';  
import Navbar from "./component/Navbar";
import About from "./component/About"
import NoteState from "./context/notes/NoteState";
import Home from "./component/Home";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Alert from "./component/Alert";


function App() {

  const [ alert, setAlert] = useState(null)

  const showAlert=(message, type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  };

  return (
    <>
    <Router>
      <NoteState>
        <Navbar/>
        <Alert alert = {alert}/>
        
        <div className="container">

          <Routes>
            <Route path="/" element={<Home showAlert = {showAlert}/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/login" element={<Login showAlert = {showAlert}/>}></Route>
            <Route path="/signup" element={<SignUp showAlert = {showAlert}/>}></Route>
          </Routes>

        </div>

      </NoteState>
    </Router>
    
    </>
  );
}

export default App;
