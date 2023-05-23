import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';
import pet from "../images/img_2.png";
function Navbar() {
  // Define state variable isOpen and function setIsOpen using useState
  const [isOpen, setIsOpen] = useState(false);

  // Define function toggleMenu that toggles the value of isOpen
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Add a link to the home page */}
        <Link className="navbar-brand" to="/">
         <img src={pet} className="pet-logo" alt="..."></img>
        </Link>
        {/* Add a button to toggle the menu */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Add a div that displays the menu items */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Add a link to the home page */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                onClick={toggleMenu}
              >
                DashBoard
              </Link>
            </li>

            {/* Add a link to the about page */}
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={toggleMenu}>
                About
              </Link>
            </li>
            {/* Add a link to the contact page */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </li>
             <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                onClick={toggleMenu}
              >
                Appointments
              </Link>
            </li>
             <li className="nav-item">
              <Link
                className="nav-link"
                to="/reports"
                onClick={toggleMenu}
              >
                Reports
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
