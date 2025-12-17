import React, { useContext, useState } from "react";
import Alertcontext from "../Contexts/alertcontext";
import {useNavigate,Link} from "react-router-dom"


const Signup = () => {
    document.title = "iNotebook - SignUp"
  const navigate = useNavigate();
  const [cred, setCred] = useState({ username:"",email: "", password: "" });
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const alertcon = useContext(Alertcontext)
  const {alertFunc} = alertcon;

  const handlesubmit = async (e) => {
    e.preventDefault();

    if(cred.username.length < 3){
      alertFunc("danger","Username must be at least 3 characters long","circle-exclamation")
      return;
    }
    if(cred.password.length < 5){
      alertFunc("danger","Password must be at least 5 characters long","circle-exclamation")
      return;
    }


    const fetchUrl = `https://inotebook-backend-ki7k.onrender.com/api/auth/createuser`;
    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username : cred.username,email: cred.email, password: cred.password }),
    });
    let data = await response.json()

    if(response.status === 409){
     setTimeout(() =>{
        navigate("/login")
     },1000)
      alertFunc("danger",data.error,"circle-exclamation")
      setCred({username:"",email:"",password:""})
      return;
    }
    if(!response.ok){
      alertFunc("danger","Some error occurred. Please try again","circle-exclamation")
      setCred({username:"",email:"",password:""})
      return;
    }
      alertFunc("success","SignUp Successful","circle-check")
      navigate("/login")
      setCred({username:"",email:"",password:""})
  };
  return (
    <div className="addnote-container" style={{ marginTop: "3rem" }}>
        <h2>Sign Up :</h2>
      <form onSubmit={handlesubmit}>
         <div class="form-group my-3">
          <label for="exampleInputPassword1" className="my-2">Username :</label>
          <input
            type="text"
            class="form-control"
            id="username"
            name="username"
            placeholder="Enter Username"
            onChange={onChange}
            value={cred.username}
          />
        </div>
        <div class="form-group my-3">
          <label for="exampleInputEmail1" className="my-2">Email address :</label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
            value={cred.email}
          />
        </div>
        <div class="form-group my-3">
          <label for="exampleInputPassword1" className="my-2">Password :</label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            placeholder="Set Password"
            onChange={onChange}
            value={cred.password}
          />
        </div>

        <button type="submit" class="btn btn-secondary bg-dark">
          SignUp  <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </button>
      </form>
       <div className="container text-center">
         <p className="my-3">Already have an account ? <Link to={"/login"}><u style={{color:"#FA003F"}}>Login</u></Link></p>
      </div>
    </div>
  );
};

export default Signup;
