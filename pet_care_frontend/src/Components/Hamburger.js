import React from 'react';
import '../CSS/Hamburger.css';

function Hamburger(props) {
  return (
    <button className="hamburger" onClick={props.onClick}>
      <span className="line"></span>
      <span className="line"></span>
      <span className="line"></span>
    </button>
  );
}

export default Hamburger;
