import React from 'react'
import { useContext } from 'react'
import notecontext from '../Contexts/notecontext'
import Noteitem from './Noteitem'

const Notes = () => {
  const context = useContext(notecontext);
  const {notes,addnote} = context;
  return (
  <div className="container my-3 mx-2">
  <div className="row">
  
      <h2>Your Notes:</h2>
      <div className="container">
      {notes.length===0 && 'No notes to display'}
      </div>
      {notes.map((note) => {
        return (
          <Noteitem 
            key={note._id}  
            id={note._id}  
            title={note.title}
            description={note.description}
            date = {note.date}
            tag={note.tag}
          />
        );
      })}
    </div>
  </div>


  )
}

export default Notes
