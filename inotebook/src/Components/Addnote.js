import React, { useContext } from 'react'
import { useState } from 'react'
import notecontext from '../Contexts/notecontext'
import Alertcontext from '../Contexts/alertcontext'


const Addnote = () => {
  let context = useContext(notecontext)
  let alertcon = useContext(Alertcontext)
  let {alertFunc} = alertcon
  let {addNote} = context
  let [note,setNote] = useState({title:"",description:"",tag:"No tag assigned"});
  const onChange = (e) =>{
 
   setNote({...note,[e.target.name] : e.target.value})
  }
  const handleclick = (e)=>{
    e.preventDefault()
    if(note.title == "" && note.description == "") alertFunc("danger","Title and Description cannot be empty","circle-exclamation")
    else if(note.title == "") alertFunc("danger","Please enter a valid title for your note","circle-exclamation")
    else if(note.description == "") alertFunc("danger","Please enter a valid description for your note","circle-exclamation")
    
    else {
      addNote(note.title,note.description,note.tag);
      setNote({title:"",description:"",tag:"No tag assigned"})
    }
  }
  return (
      <div className="container addnote-container" style={{marginTop:"50px"}} >
        <h2 className='my-3 mx-2'>Add a note <i class="fa-solid fa-note-sticky"></i></h2>
        <div className='container'>
        <form>
        <div class="mb-3">
            <label htmlFor="title" class="form-label">Enter Title for your new note :</label>
            <input type="text" class="form-control" id="title" name="title"aria-describedby="emailHelp" onChange={onChange} value={note.title}/>
          
        </div>
        <div class="mb-3">
            <label htmlFor="description" class="form-label">Enter description for your new note :</label>
            <textarea type="text" class="form-control" id="description" name="description"  onChange={onChange} value={note.description}/>
        </div>
        <div class="mb-3">
            <label htmlFor="tag" class="form-label">  Want to add tag ?</label>
            <input type="tag" class="form-control" id="tag" name="tag"  onChange={onChange} value={note.tag}/>
        </div>
       
        <button type="submit" class="btn btn-dark" onClick={handleclick}>Add Note <i class="fa-solid fa-plus"></i></button>
        </form>
        </div>
        </div>
  )
}

export default Addnote
