import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Analytics from "./components/Analytics";
import About from "./components/About";
import NoPage from "./components/NoPage";
import NewMap from "./components/NewMap";
import Form from "./components/Form";
import AuthState from "./components/context/auth/AuthContext";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./components/Dashboard";
import LoginSignUp from "./components/LoginSignUp";
import Newtry from "./components/Newtry";
import Complaints from "./components/Complaints";
import Profile from "./components/Profile";
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";

function App() {
  return (
    <>
      {/* <React.StrictMode> */}
      <BrowserRouter>
        <div className="home-container">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              {/* <Route path="" element={<RequireAuth />}> */}
              <Route path="analytics" element={<Analytics />} />
              {/* </Route> */}
              <Route path="form" element={<Form />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="auth" element={<LoginSignUp />} />
              <Route path="newmap" element={<NewMap />} />
              <Route path="newtry" element={<Newtry />} />
              <Route path="complaints" element={<Complaints />} />
              <Route path="profile" element={<Profile />} />
              <Route path="login" element={<Login />} />
              <Route path="aboutUs" element={<AboutUs />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
      {/* </React.StrictMode> */}
    </>
  );
}

export default App;
