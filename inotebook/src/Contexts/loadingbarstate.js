import { useState } from "react";
import loadingbarcontext from "./loadingbarcontext";

const Loadingbarstate = (props) =>{
    const [progress,setProgres] = useState(0);
    const progressFunc = (val) =>{
        setProgres(val);
    }
    return(
        <loadingbarcontext.Provider value={{progress,progressFunc}}>
            {props.children}
        </loadingbarcontext.Provider>
    )
}

export default Loadingbarstate;