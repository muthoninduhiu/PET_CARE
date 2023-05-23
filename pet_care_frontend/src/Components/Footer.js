import React from 'react';
import '../CSS/Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className='footer-container '>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <p className='text-center'>&copy; 2023 Portfolio Website. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
