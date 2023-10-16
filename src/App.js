import React from "react";

import {  
  BrowserRouter as Router,  
  Routes,  
  Route,  
  Link  
}   
from 'react-router-dom';  
import Navbar from "./component/Navbar";
import About from "./component/About"
import NoteState from "./context/notes/NoteState";
import Home from "./component/Home";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
function App() {
  return (
    <>
    <Router>
      <NoteState>
        <Navbar/>
        
        <div className="container">

          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
          </Routes>

        </div>

      </NoteState>
    </Router>
    
    </>
  );
}

export default App;
