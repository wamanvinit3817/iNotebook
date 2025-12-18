import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import notecontext from "../Contexts/notecontext";
import Alertcontext from "../Contexts/alertcontext";

const Editnote = () => {
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const context = useContext(notecontext);
  const { id } = useParams();
   let alertcon = useContext(Alertcontext)
   let {alertFunc} = alertcon
  let { editNote, getNote } = context;
  const setInitialNote = async () => {
    const response = await getNote(id);
    setNote({
      title: response.title,
      description: response.description,
      tag: response.tag,
    });
  };
  useEffect(() => {
    setInitialNote();
  }, [id]);

  let handleclick = () => {
     if(note.title == "" && note.description == "") alertFunc("danger","Title and Description cannot be empty")
    else if(note.title == "") alertFunc("danger","Please enter a valid title for your note")
    else if(note.description == "") alertFunc("danger","Please enter a valid description for your note")
    
    else {
      editNote(id, note.title, note.description, note.tag);
      setNote({title:"",description:"",tag:"No tag assigned"})
    }
   
  };
  let onChange = (e) => {
    e.preventDefault();
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container addnote-container" style={{marginTop:"4rem"}}>
      <div className="container my-3">
        <h2 className="my-3">Edit note <i class="fa-solid fa-file-pen"></i></h2>
        <form>
          <div class="mb-3">
            <label for="title" class="form-label">
              Enter new Title for your note :
            </label>
            <input
              type="text"
              class="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={note.title}
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">
              Enter new description for your note :
            </label>
            <input
              type="text"
              class="form-control"
              id="description"
              name="description"
              onChange={onChange}
              value={note.description}
            />
          </div>
          <div class="mb-3">
            <label for="tag" class="form-label">
              Want to change the Tag ?
            </label>
            <input
              type="tag"
              class="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>

          <Link to={"/"}>
            <button type="submit" class="btn btn-dark" onClick={handleclick}>
              Done <i class="fa-solid fa-check"></i>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Editnote;
