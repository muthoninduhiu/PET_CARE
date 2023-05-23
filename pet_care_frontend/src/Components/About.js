import React from "react";
// import "../CSS/Home.css";
import Images from "../images/3.jpg";

function Home() {
  return (
    <div className="home-container">
     <h1 style={{marginTop: 20 + 'px'}}>About Us</h1>
      <section>
        <div class="container">
          <div class="row mt-5 jalign-self-center">
            <div class="col-8 ">
              <p className="m-4 py-5">
              I am passionate about technology and innovation.
              I believe that everyone should have the opportunity to learn and succeed in the tech industry,
              regardless of their gender, race, or background.
              I believe that a more diverse and inclusive tech industry will benefit everyone,
              leading to more innovative solutions, better products, and stronger communities.
              </p>
            </div>
            <div class="col-4">
              <img src={Images} class="card-img-top" alt="..."></img>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;