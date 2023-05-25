import React from 'react';
import '../CSS/About.css'; // Import the CSS file for styling
import image1 from '../images/2.jpg'
import image2 from '../images/3.jpg'
import image3 from '../images/thumbs.jpg'
const About = () => {
  const staffMembers = [
    {
      name: 'John Doe',
      role: 'CEO',
      image: image1,
    },
    {
      name: 'Jane Smith',
      role: 'Head of Product',
      image: image2,
    },
    {
      name: 'Peter Parker',
      role: 'Web Developer',
      image: image3,
    },
    // Add more staff members as needed
  ];

  return (
    <section className="about-us">
      <h1>About Us</h1>
      <p>
        Our team of experts is passionate about personal care and is committed to delivering high-quality solutions tailored to your needs. Whether you're looking for skincare, haircare, or general wellness products, we've got you covered.
      </p>
      <p>
        We believe that self-care is essential for a balanced and healthy lifestyle. That's why we strive to offer a wide range of products that are both effective and sustainable. We carefully select our suppliers to ensure that our offerings are ethically sourced and environmentally friendly.
      </p>
      <h3>Our Team</h3>
      <div className="staff-members">
        {staffMembers.map((member, index) => (
          <div key={index} className="staff-member">
            <img src={member.image} alt={member.name} />
            <h4>{member.name}</h4>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
