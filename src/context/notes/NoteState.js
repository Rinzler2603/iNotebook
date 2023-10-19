import React, { useState } from "react";
import NoteContext from "./noteContext";
import { json } from "react-router-dom";

const NoteState = (props) => {
  const host = "http://192.168.0.105:5000"
  const notesInitial = [
  ];

  const [notes, setNotes] = useState(notesInitial);

//  Get all Notes
  const getNotes = async ()=>{
    const response = await fetch(`${host}/api/notes/getNotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const rjson = await response.json(); // parses JSON response into native JavaScript objects
    setNotes(rjson)
  }

  // Add Note 
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title:title, description:description, tag:tag}), // body data type must match "Content-Type" header
    });
    const rjson = await response.json(); // parses JSON response into native JavaScript objects

    getNotes()
  }

  // Delete Note
  const deleteNode = async (id) => {
    console.log("deleting note with id "+id)

    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    getNotes()
  }

  // Edit NNote
  const editNode = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header/
    });

    getNotes()
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNode, editNode, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
