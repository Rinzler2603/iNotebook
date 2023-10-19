import React, { useState, useContext} from "react";
import noteContext from '../context/notes/noteContext';

function Addnote(props) {
    const context = useContext(noteContext);
    const { notes, addNote } = context;
    const { toggle, handleToggle } = props;

    const [note, setnote] = useState({title : "", description : ""})

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        handleToggle()
    }

    const onchange = (e)=> {
        setnote({...note, [e.target.id]: e.target.value})
    }


    if(toggle)
    return (
        <div className="addnote">
            <h1 className="text-center">Add a Note</h1>
            <form >
                <div className="form-group">
                    <input type="text" className="" id="title" aria-describedby="emailHelp" placeholder="Enter Title" onChange={onchange} />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className=""
                        id="description"
                        placeholder="Enter description"
                        onChange={onchange}
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button disabled = {note.title.length <3 || note.description.length<5} type="submit" className="btn" onClick={handleClick}>
                        <i class="bi bi-check-lg"></i>
                    </button>
                    <button type="submit" className="btn" onClick={handleToggle}>
                        <i class="bi bi-x"></i>
                    </button>
                </div>
            </form>
           
        </div>
    );
}

export default Addnote;
