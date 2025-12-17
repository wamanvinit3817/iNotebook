import React, { useState,useContext } from "react";
import Alertcontext from "../Contexts/alertcontext";
import { Link, unstable_HistoryRouter, useNavigate } from "react-router-dom";


const Login = () => {
    document.title = "iNotebook - Login"
     const alertcon = useContext(Alertcontext)
     const {alertFunc} = alertcon;
    let navigate = useNavigate();
    
  const [cred, setCred] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    
    const fetchUrl = `https://inotebook-backend-ki7k.onrender.com/api/auth/login`;
    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: cred.email, password: cred.password }),
    });
    const data = await response.json();
    console.log(data)
    if (!response.ok) {
   
    if (data.errors && data.errors.length > 0) {
      alertFunc("danger", data.errors[0].msg, "circle-exclamation");
    } else if (data.error) {
      alertFunc("danger", data.error, "circle-exclamation");
    } else {
      alertFunc("danger", "Login failed", "circle-exclamation");
    }
    return;
  }
    localStorage.setItem("token", data.authToken);
    alertFunc("success", "Logged in successfully", "circle-check");
    setCred({ email: "", password: "" });
   navigate("/");
  };
  return (
    <div  className="addnote-container" style={{ marginTop: "3rem" }}>
        <h2>Login to iNotebook :</h2>
      <form onSubmit={handlesubmit}>
        <div class="form-group my-3">
          <label for="exampleInputEmail1" className="my-2">Email address</label>
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
          <label for="exampleInputPassword1" className="my-2">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
            value={cred.password}
          />
        </div>

        <button type="submit" class="btn btn-secondary bg-dark">
          Login <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </button>
      </form>
      <div className="container text-center">
         <p className="my-3">New on iNotebook ? <Link to={"/signup"}><u style={{color:"#FA003F"}}>SignUp</u></Link></p>
      </div>
     
    </div>
  );
};

export default Login;
