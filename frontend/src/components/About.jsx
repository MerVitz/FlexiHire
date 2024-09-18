/* eslint-disable no-unused-vars */
import React from 'react';
import './styles/about.css';
import Navbar from './navbar';

const About = () => {
  return (
    <div className="about-section">
      <header className="header">
        <Navbar/>
      </header>
      <section className="about-content">
        <h1>About FlexiHire</h1>
        <div className="careers">
          <h2>Careers</h2>
          <p>At FlexiHire, we are always looking for talented individuals to join our team. If you are passionate about sales, customer service, or technology, we would love to hear from you.</p>
        </div>
        <div className="sales-persons">
          <h2>Sales Persons</h2>
          <p>Our dedicated sales team is here to help you find the best solutions for your needs. Whether you need to rent equipment or vehicles, our salespersons are ready to assist you.</p>
        </div>
        <div className="developers">
          <h2>Developers</h2>
          <p>FlexiHire was developed by a talented developer: Amakalu Vitalis. His expertise and dedication have made FlexiHire a reliable and user-friendly platform.</p>
        </div>
        <div className="location">
          <h2>Location</h2>
          <p>FlexiHire is located in Kisumu West, Kenya, in Kisumu County, Maseno town. We are committed to serving our local community and beyond with quality rental services.</p>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2024 FlexiHire. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
