import "./App.css";
import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notestate from "../src/Contexts/notestate";
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

  let tohide = alert?.message ? "block" : "none";

  return (
    <div className="app-wrapper">
      <Router>
        <Notestate>
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
                  <i className={`alert-icon mx-1 fa-solid fa-${alert.icon}`}></i>
                )}
                {alert.message}
              </div>
            </div>
          )}

          {/* 👇 THIS IS THE IMPORTANT PART */}
          <main className="content">
            <div className="container my-3">
              <Routes>
                <Route path="/editnote/:id" element={<Editnote />} />

                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Addnote />
                      <Home />
                    </ProtectedRoute>
                  }
                />

                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </main>
         
        </Notestate>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
