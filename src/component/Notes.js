import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from '../context/notes/noteContext';
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNode } = context;

  const [note, setnote] = useState({id:"",etitle : "", edescription : "",etag:""})

  const updateNote = (CurrentNote) => {
    setnote({id:CurrentNote._id,etitle:CurrentNote.title, edescription:CurrentNote.description, etag:CurrentNote.tag})
    
    ref.current.click();
  }

  useEffect(() => {
    getNotes()
  }, [])

  const onchange = (e)=> {
      setnote({...note, [e.target.id]: e.target.value})
  }

  const handleClick = (e)=> {
    editNode(note.id, note.etitle, note.edescription, note.etag)
    ref.current.click();
  }
  const ref = useRef(null)

  return (
    <div>
      <Addnote />
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" placeholder="Enter Note" value={note.etitle} onChange={onchange} />
              </div>
              <div className="form-group">
                <label htmlFor="edescription">Desription</label>
                <input
                  type="text" className="form-control" id="edescription" placeholder="description" value={note.edescription} onChange={onchange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="etag">Tag</label>
                <input
                  type="text" className="form-control" id="etag" placeholder="tag" value={note.etag} onChange={onchange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled = {note.etitle.length<3 || note.edescription<5} type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <div className="container">
          {notes.length === 0 ? "No Notes to display":""}
        </div>
        {notes?.map((note) => {
          return <Noteitem note={note} updateNote={updateNote} key={note._id} />
        })}
      </div>
    </div>
  );
};

export default Notes;
