import React from "react";
import "./App.css";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import ProjectSubmissions from "./pages/ProjectSubmissions";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Login from "./signup/Login";
import { useState } from 'react';
import Modal from 'react-modal';


Modal.setAppElement('#root');
function App() {
  // const [seen, setSeen] = useState(false);

  // function togglePop() {
  //   setSeen(!seen);
  // }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // const API_URL = "http://localhost:3000/"
  return (
    <>
      <Navbar />
      {/* <Login /> */}
      <button onClick={toggleModal}>Login</button> {/* Button to open the modal */}
      {isModalOpen && <Login toggle={toggleModal} />} {/* Only render Login when modal is open */}
      {/* <button onClick={togglePop}>Login</button> */}
      {/* {seen ? <Login toggle={togglePop} /> : null} */}
      {/* <div className="container">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/projectsubmission" element={<ProjectSubmissions />}/>
        <Route path="/projects" element={<Home />}/>
      </Routes>
    </div> */}
    </>
  );
}

export default App;
