import React from "react";
import '../CSS/Skills.css'; // Importing a CSS file for styling

function SkillsBar () {
   return (<>
    <h1 className="title-text" style={{marginTop: 20 + 'px'}}>Services</h1>
       <div className="skill-container"> {/* Container for all the skills */}
            <div className="skill-set"> {/* Container for all the skill boxes */}
           <div className="skill-box"> {/* Skill box for HTML */}
               <span className="title">HTML</span> {/* Title for the skill */}
               <div className="skill-bar"> {/* Skill bar for the skill */}
                   <span className="skill-per html"> {/* Skill percentage with class for styling */}
                       <span className="tooltip">95%</span> {/* Tooltip with skill percentage */}
                   </span>
               </div>
           </div>
           <div className="skill-box"> {/* Skill box for CSS */}
               <span className="title">CSS</span>
               <div className="skill-bar">
                   <span className="skill-per css">
                       <span className="tooltip">80%</span>
                   </span>
               </div>
           </div>
           <div className="skill-box"> {/* Skill box for JavaScript */}
               <span className="title">JavaScript</span>
               <div className="skill-bar">
                   <span className="skill-per javascript">
                       <span className="tooltip">60%</span>
                   </span>
               </div>
           </div>
           <div className="skill-box"> {/* Skill box for NodeJS */}
               <span className="title">NodeJS</span>
               <div className="skill-bar">
                   <span className="skill-per nodejs">
                       <span className="tooltip">40%</span>
                   </span>
               </div>
           </div>
           <div className="skill-box"> {/* Skill box for ReactJS */}
               <span className="title">ReactJS</span>
               <div className="skill-bar">
                   <span className="skill-per reactjs">
                       <span className="tooltip">70%</span>
                   </span>
               </div>
           </div>
           <div className="skill-box"> {/* Skill box for ExpressJS */}
               <span className="title">ExpressJS</span>
               <div className="skill-bar">
                   <span className="skill-per expressjs">
                       <span className="tooltip">75%</span>
                   </span>
               </div>
           </div>
           </div>
       </div>
       </>
   )
}

export default SkillsBar; // Exporting the component for use in other files
