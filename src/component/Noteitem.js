import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
  const context = useContext(noteContext)
  const { deleteNode } = context;

  const { note, updateNote } = props;
  return (
    <div className="col-md-3 mx-4 ">
      <div className="card my-3" style={{width: "18rem"}}>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title text-center">{note.title}</h5>
            <i className="bi bi-trash3-fill" onClick={()=>{deleteNode(note._id)}}></i>
            <i className="bi bi-pencil-square" onClick={()=>{updateNote(note)}}></i>
          </div>
          <p className="card-text">
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
