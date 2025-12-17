import "./App.css";
import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notestate from "../src/Contexts/notestate";
import Alert from "./Components/Alert";
import Addnote from "./Components/Addnote";
import { useContext } from "react";
import Alertcontext from "../src/Contexts/alertcontext";
import Editnote from "./Components/Editnote";
import LoadingBar from "react-top-loading-bar";
import loadingbarcontext from "./Contexts/loadingbarcontext";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Contexts/ProtectedRoute";

function App() {
  const context = useContext(Alertcontext);
  const { alert } = context;
  const loadingbarcon = useContext(loadingbarcontext);
  const { progress, progressFunc } = loadingbarcon;
  let tohide = "block";

  if (alert.message === "") {
    tohide = "none";
  }
  return (
    <>
      <Router>
        <Notestate>
          <div>
            <Navbar />
            <LoadingBar
              color="#fA003f"
              progress={progress}
              onLoaderFinished={() => progressFunc(0)}
              containerStyle={{
                top: "65px",
                zIndex: 1020,
                height: "3px",
              }}
            />
          </div>

          {alert && (
            <div
              style={{
                display: tohide,
                position: "fixed",
                top: "80px",
                right: "20px",
                zIndex: 1020,
                minWidth: "300px",
                marginRight: "5rem",
              }}
            >
              <div className={`custom-alert alert-${alert.color}`}>
                {alert.icon && (
                  <i
                    className={`alert-icon mx-1 fa-solid fa-${alert.icon}`}
                  ></i>
                )}
                {alert.message}
              </div>
            </div>
          )}

          <div className="container my-3">
            <Routes>
              <Route exact path="/editnote/:id" element={<Editnote />}></Route>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Addnote />
                    <Home />
                  </ProtectedRoute>
                }
              />

              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
            </Routes>
          </div>
        </Notestate>
      </Router>
      <Footer />
    </>
  );
}

export default App;
