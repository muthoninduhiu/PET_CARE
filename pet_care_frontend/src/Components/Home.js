import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-heading display-4 text-center">
        Welcome to Pet Haven's Dashboard
      </h1>
      <section className="home-section">
        <h5 className="text-center">Start by exploring the following sections:</h5>
        <div className="dashboard-buttons d-flex justify-content-center">
          <Link to="/pets" className="dashboard-button btn btn-primary">
            View Pets
          </Link>
          <Link to="/appointments" className="dashboard-button btn btn-primary">
            View Appointments
          </Link>
          <Link to="/services" className="dashboard-button btn btn-primary">
            View Services
          </Link>
          <Link to="/reports" className="dashboard-button btn btn-primary">
            View Reports
          </Link>
        </div>
      </section>
    </div>

  );
}

export default Home;
