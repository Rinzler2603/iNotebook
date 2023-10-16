import React, { useState, useContext} from "react";
import noteContext from '../context/notes/noteContext';

function Addnote() {
    const context = useContext(noteContext);
    const { notes, addNote } = context;

    const [note, setnote] = useState({title : "", description : ""})

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
    }

    const onchange = (e)=> {
        setnote({...note, [e.target.id]: e.target.value})
    }

    return (
        <div>
            <h1 className="text-center">Add a Note</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter Note" onChange={onchange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Desription</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Password"
                        onChange={onchange}
                    />
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Check me out
                    </label>
                </div>
                <button disabled = {note.title.length <3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
                    Add Note
                </button>
            </form>
            <h1 className="text-center">Your Notes</h1>
        </div>
    );
}

export default Addnote;
