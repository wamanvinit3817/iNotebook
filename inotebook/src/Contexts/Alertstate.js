import Alertcontext from "./alertcontext";
import { useState } from "react";

const Alertstate = (props) =>{
    const [alert, setAlert] = useState({color:"", message:"",icon:""});
    const alertFunc = (color,message,icon) => {
        setAlert({color:color, message:message,icon:icon});
        setTimeout(() => {
            setAlert({color:"", message:"",icon:""});
        }, 2000);
    }
    return(
        <Alertcontext.Provider value={{alert,alertFunc}}>
            {props.children}
        </Alertcontext.Provider>
    )
}
export default Alertstate;