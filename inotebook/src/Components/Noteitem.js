import React, { useContext } from 'react'
import notecontext from '../Contexts/notecontext';
import { Link } from "react-router-dom";

const Noteitem = (props) => {
  const {id,title,description,tag} = props;
  const context = useContext(notecontext)
  const {deleteNote} = context
  const handleclick = () =>{
   deleteNote(id);
  }
  return (
    <div className="col-md-4 my-3">
      <div class="card" style={{width: "18rem"}}>
       
        <div class="card-body">
            <h5 class="card-title">{title}</h5>
            <p class="card-text">{description}</p>
            
             <span class=" badge rounded-pill bg-danger classtag" style={{marginRight:"1rem"}}>
                {tag}
                <span class="visually-hidden">unread messages</span>
            </span>
            <i class="fa-solid fa-trash-can classicon" onClick={handleclick}></i>
            <Link to={`/editnote/${id}`}><i class="fa-solid fa-pen-to-square mx-2 classicon" style={{color:"black"}}></i></Link>
            
        </div>
        </div>
     </div>
  )
}

export default Noteitem
