import { useState } from 'react';
import DOMPurify from 'dompurify';
import Social from './Social';

const ContactForm = () => {
  // Define state variables for name, email, message, and error messages
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');
  // Define a function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); //prevents default behaviour of form submission
    // reset error message
    setNameError('');
    setEmailError('');
    setMessageError('');

    let isValid = true;

    // Check if name field is empty
    if (name.trim() === '') {
      setNameError('Please enter your name');
      isValid = false;
    }

    // Check if email field is empty or contains an invalid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
      setEmailError('Please enter your email');//update email error message
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address');  // update error message
      isValid = false;
    }

    // Check if message field is empty
    if (message.trim() === '') {
      setMessageError('Please enter a message');
      isValid = false;
    }

    if (isValid) {
      console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
      //save results
      alert("Saved successfully!");
      setName('');
      setEmail('');
      setMessage('');
    }
  };



  return (
    // create a form for users to submit their name, email, and message
    <div className="container">
      <h1 className="text-center mb-5 mt-4">Keep in Touch</h1>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                // validation for the name, email, and message fields, and will display an error message if any of these fields are invalid
                onChange={(e) => setName(e.target.value)}
                className={`form-control ${nameError ? 'is-invalid' : ''}`}
              />
              {nameError && <div className="invalid-feedback">{DOMPurify.sanitize(nameError)}</div>}
            </div>
            {/* web page gives error if input isnt email */}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-control ${emailError ? 'is-invalid' : ''}`}
              />
              {emailError && <div className="invalid-feedback">{DOMPurify.sanitize(emailError)}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`form-control ${messageError ? 'is-invalid' : ''}`}
              ></textarea>
              {messageError && <div className="invalid-feedback">{DOMPurify.sanitize(messageError)}</div>}
            </div>
            {/* submit button that will trigger a handleSubmit function when clicked */}
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
          </form>
        </div>
        {/* add a Google Maps iframe displaying the location of Athi River */}
        <div className="col-lg-6">
          <div className="embed-responsive embed-responsive-1by1">
            <iframe
              title="Map"
              className="embed-responsive-item"
              src="https://maps.google.com/maps?q=athi%20river&t=&z=10&ie=UTF8&iwloc=&output=embed" 
            height={250}
            width={250}
            ></iframe>
          </div>
        </div>
      </div>
      {/* add Social component with the social media icons */}
      <Social/>
    </div>
  );
};

export default ContactForm;
