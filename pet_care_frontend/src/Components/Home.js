import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to the Pet Haven System Dashboard</h1>
      <section className="home-section">
        <h5>Start by exploring the following sections:</h5>
        <div className="dashboard-buttons">
          <Link to="/pets" className="dashboard-button">
            View Pets
          </Link>
          <Link to="/appointments" className="dashboard-button">
            View Appointments
          </Link>
          <Link to="/services" className="dashboard-button">
            View Services
          </Link>
          <Link to="/reports" className="dashboard-button">
            View Reports
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
