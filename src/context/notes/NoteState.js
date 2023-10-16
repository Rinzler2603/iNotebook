import React, { useState } from "react";
import NoteContext from "./noteContext";
import { json } from "react-router-dom";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [
  ];

  const [notes, setNotes] = useState(notesInitial);

//  Get all Notes
  const getNotes = async ()=>{
    const response = await fetch(`${host}/api/notes/getNotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxMWM5MjA1Y2JkYzE5MGEyNmVjMjg0In0sImlhdCI6MTY5NTY3MDc1NX0.LzlVckv9VncPDj8wl3xOMYuNKiuJA-mTLtALZDDfC1E"
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxMWM5MjA1Y2JkYzE5MGEyNmVjMjg0In0sImlhdCI6MTY5NTY3MDc1NX0.LzlVckv9VncPDj8wl3xOMYuNKiuJA-mTLtALZDDfC1E"
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxMWM5MjA1Y2JkYzE5MGEyNmVjMjg0In0sImlhdCI6MTY5NTY3MDc1NX0.LzlVckv9VncPDj8wl3xOMYuNKiuJA-mTLtALZDDfC1E"
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxMWM5MjA1Y2JkYzE5MGEyNmVjMjg0In0sImlhdCI6MTY5NTY3MDc1NX0.LzlVckv9VncPDj8wl3xOMYuNKiuJA-mTLtALZDDfC1E"
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
