import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
  const context = useContext(noteContext)
  const { deleteNode } = context;

  const { note, updateNote } = props;
  return (
    <div className="col-md-3 mx-4 ">
      <div className="card my-3 note-item" style={{width: "18rem"}}>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title text-center">{note.title}</h5>
          </div>
          <p className="card-text">
            {note.description}
          </p>
          <p className="d-flex align-items-center cont" style={{marginBottom:"0"}}>
            <div className="ico">
              <i className="bi bi-trash3-fill mx-2" onClick={()=>{deleteNode(note._id)}}></i>
            </div>
            <div className="ico">
              <i className="bi bi-pencil-square mx-2" onClick={()=>{updateNote(note)}}></i>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
