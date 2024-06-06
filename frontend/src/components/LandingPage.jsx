/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/landingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="navbar-container">
          <nav className="navbar">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/notifications">Notifications</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/signin">Sign In</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to FlexiHire</h1>
          <p>Your one-stop solution for hiring vehicles and equipment.</p>
          <button className="button-link">
            <Link to="/signup" className="link-text">Get Started</Link>
          </button>
        </div>
      </section>
      <section className="services">
        <div className="service-item">
        <div className="service-image">
            <img src="/assets/skating-gear.jpg" alt="Skating" />
          </div>
          <div className="service-text">
            <h3>Need Skating?</h3>
            <p>Find the best skateboards and gear for your skating adventures.</p>
          </div>
        </div>
        <div className="service-item">
          <div className="service-image">
            <img src="/assets/mountain-bikes.jpg" alt="Mountain Climbing" />
          </div>
          <div className="service-text">
            <h3>Need to go for mountain climbing?</h3>
            <p>Hire the best mountain bikes and equipment for your mountain climbing expeditions.</p>
          </div>
        </div>
        <div className="service-item">
        <div className="service-image">
            <img src="/assets/cars-available.jpg" alt="Car" />
          </div>
          <div className="service-text">
            <h3>Need a car?</h3>
            <p>Rent cars for your personal and business needs with ease.</p>
          </div>

        </div>
      </section>
      <section className="features">
        <h2>Our Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>Easy Booking</h3>
            <p>Book vehicles and equipment with just a few clicks.</p>
          </div>
          <div className="feature-item">
            <h3>Team Booking</h3>
            <p>Book a set of items for your team events and activities.</p>
          </div>
          <div className="feature-item">
            <h3>Rate and Comment</h3>
            <p>Provide feedback and rate our services to help us improve.</p>
          </div>
        </div>
      </section>
      <footer className="footer">
      <div className="footer-subscribe">
        <h3>NEW TO FLEXIHIRE?</h3>
        <p>Subscribe to our newsletter to get updates on our latest offers!</p>
        <div className="subscribe-form">
          <input type="email" placeholder="Enter E-mail Address" />
          <button>SUBSCRIBE</button>
        </div>
        <div className="gender-selection">
          <button>MALE</button>
          <button>FEMALE</button>
        </div>
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h4>NEED HELP?</h4>
          <ul>
            <li><a href="#">Chat with us</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>ABOUT FLEXIHIRE</h4>
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Terms and Conditions</a></li>
            <li><a href="#">Privacy Notice</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>USEFUL LINKS</h4>
          <ul>
            <li><a href="#">Service Center</a></li>
            <li><a href="#">Delivery options</a></li>
            <li><a href="#">How to return a product</a></li>
            <li><a href="#">Corporate and bulk purchases</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>MAKE MONEY WITH FLEXIHIRE</h4>
          <ul>
            <li><a href="#">Sell on FlexiHire</a></li>
            <li><a href="#">Vendor hub</a></li>
            <li><a href="#">Become a Sales Consultant</a></li>
            <li><a href="#">Become a Logistics Service Partner</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 FlexiHire. All rights reserved.</p>
      </div>
    </footer>
    </div>
  );
};

export default LandingPage;
