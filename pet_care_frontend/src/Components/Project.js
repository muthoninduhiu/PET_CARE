import React from "react";
import "../CSS/Projects.css"; // import CSS styles
import 'bootstrap/dist/css/bootstrap.min.css'; // import Bootstrap CSS
import image1 from '../images/about.jpg' // import image 1
import image2 from '../images/img.jpg' // import image 2

function Project() {
  return (
    <div className="project-container"> {/* container for the projects */}
      <h1> Pet Details</h1> {/* heading for the projects */}
      <div className="container mt-5"> {/* Bootstrap container */}
        <div className="row"> {/* Bootstrap row */}
          <div className="col-sm-6 mb-3 mb-sm-0"> {/* first column */}
            <div className="card shadow"> {/* card for first project */}
              <img
                src={image1} // image for first project
                class="card-img-top" // class for top of card
                alt="tracker" // alternative text for image
                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
              ></img>
              <div className="card-body">
                <h5 className="card-title">👩‍💻 100 Days of Coding tracker </h5> {/* title of first project */}
                <p className="card-text">
                  Track your progress. Log daily progress, metrics, and
                  milestones to see how far you have progressed over the 100
                  days. {/* description of first project */}
                </p>
                <a href="https://github.com/muthoninduhiu/CFG_Introduction_To_PythonApps" className="btn shadow " target="_blank"  rel="noreferrer">
                  View {/* button to view first project */}

                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-6"> {/* second column */}
            <div className="card shadow"> {/* card for second project */}
              <img
                src={image2} // image for second project
                class="card-img-top" // class for top of card
                alt="coachella" // alternative text for image
                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
              ></img>
              <div className="card-body" >
                <h5 className="card-title">💃 Coachella website</h5> {/* title of second project */}
                <p className="card-text">
                  The Coachella Valley Music and Arts Festival is an annual
                  music and arts festival held at the Empire Polo Club in Indio,
                  California, in the Coachella Valley in the Colorado Desert. {/* description of second project */}
                </p>
                <a href="https://github.com/muthoninduhiu/Website_Project" className="btn shadow" target="_blank"  rel="noreferrer">
                  View {/* button to view second project */}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project; // export the component for use in other files
