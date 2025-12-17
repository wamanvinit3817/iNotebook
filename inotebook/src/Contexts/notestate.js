import { useContext, useState } from "react";
import Notecontext from "./notecontext";
import {useEffect} from "react";
import Alertcontext from "./alertcontext";
import loadingbarcontext from "./loadingbarcontext";
import { useNavigate } from "react-router-dom";

const Notestate = (props) => {
  const navigate = useNavigate();
  const context = useContext(Alertcontext);
  let {alertFunc} = context;
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  const loadingbarcon = useContext(loadingbarcontext);
  const {progressFunc} = loadingbarcon;
  const token = localStorage.getItem("token")
  
  const getAllNotes = async () =>{
    try{
    progressFunc(30);
    const fetchUrl = `http://localhost:5000/api/notes/fetchallnotes`;
    const response = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    setNotes(data);
    progressFunc(100);
  }catch(e){
    alertFunc("danger","Failed to fetch notes from server","circle-exclamation")
  }
  }


useEffect(() => {
  setNotes([]);         

  if (token) {
    getAllNotes();
  }
}, [token]);  

   
let addNote = async (title, description, tag) => {
  try {
    progressFunc(30);
 
    const response = await fetch(
      "http://localhost:5000/api/notes/addnote",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add note");
    }
    await getAllNotes();

    alertFunc("success", "Note Added Successfully", "circle-check");
    progressFunc(100);
  } catch (e) {
    alertFunc("danger", "Failed to add note", "circle-exclamation");
  }
};


  const deleteNote = async (id) => {
    try{
    progressFunc(30)
   let url = `http://localhost:5000/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
    });
    getAllNotes();
    alertFunc("danger","Note deleted successfully","circle-minus")
    progressFunc(100)
  }catch(e){
    alertFunc("danger","Failed to delete note","circle-exclamation")
  }
  };

  const editNote = async (id, title, description, tag) => {
    try{
    progressFunc(0)
    let url = `http://localhost:5000/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    
    await getAllNotes();
    alertFunc("success","Note edited successfully","circle-check")
    progressFunc(100)
  }catch(e){
    alertFunc("danger","Failed to edit note","circle-exclamation")
  }
  };
  const getNote = async (id) =>{
     let url = `http://localhost:5000/api/notes/getnote/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
     
    });
    return await response.json();
  }

  return (
    <Notecontext.Provider value={{ notes, addNote, deleteNote, editNote ,getNote}}>
      {props.children}
    </Notecontext.Provider>
  );
};
export default Notestate;
