import React from "react";
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Project from "./Components/Project";
import SkillsBar from "./Components/Skills";
import "./App.css";
import "./AppDark.css"; // Import the dark mode CSS
function App() {
   const [theme] = useState("dark"); // Default theme is light
  return (

    <Router>
     <div className={`App ${theme}`}>

        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/pets" element={<Project />} />
          <Route exact path="/services" element={<SkillsBar />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
