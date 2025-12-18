import React, { useContext } from 'react'
import notecontext from '../Contexts/notecontext';
import { Link } from "react-router-dom";

const Noteitem = (props) => {
  const {id,title,description,tag,date} = props;
  const context = useContext(notecontext)
  const {deleteNote} = context
  const handleclick = () =>{
   deleteNote(id);
  }
  let dateString = new Date(date).toLocaleString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
})

  let newdate = dateString.replace(",", " |");
  return (
    <div className="col-md-4 my-3">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>

          <div className="d-flex align-items-center classdate">
            <i className="fa-solid fa-calendar me-2" aria-hidden="true"></i>
            <span>{newdate}</span>
          </div>

          <div className="mt-2 d-flex align-items-center">
            <span className="badge rounded-pill bg-danger classtag me-3">
              {tag}
              <span className="visually-hidden">unread messages</span>
            </span>
            <i className="fa-solid fa-trash-can classicon" onClick={handleclick}></i>
            <Link to={`/editnote/${id}`}>
              <i className="fa-solid fa-pen-to-square mx-2 classicon" style={{ color: "black" }}></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
