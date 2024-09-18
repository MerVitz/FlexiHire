/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import './styles/landingPage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from './navbar';

const LandingPage = () => {

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow next-arrow" onClick={onClick}>
        ➡
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow prev-arrow" onClick={onClick}>
        ⬅
      </div>
    );
  };

const featureSlides = [
  {
    title: "Easy Booking",
    description: "Book vehicles and equipment with just a few clicks."
  },
  {
    title: "Team Booking",
    description: "Book a set of items for your team events and activities."
  },
  {
    title: "Rate and Comment",
    description: "Provide feedback and rate our services to help us improve."
  }
];

const featureSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};


  const slides = [
    {
      image: "/assets/skate1.png",
      title: "Explore the Best Skates",
      description: "Find the best skateboards and gear for your skating adventures."
    },
    {
      image: "/assets/skate2.png",
      title: "Skateboards Adventure",
      description: "Hire the best skateboards and gear for your skating adventures."
    },
    {
      image: "/assets/skate3.png",
      title: "Ride Your Way",
      description: "Hire mountain bikes for leisure with ease."
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };


  return (
    <div className="landing-page">
      <header className="header">
        <div className="navbar-container">
          <Navbar/>
        </div>
      </header>

      {/* Hero Section with Carousel */}
      <section className="hero">
        <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div 
              className="hero-slide" 
              style={{ 
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '50vh'
              }}
            >
              <div className="hero-content">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <button className="button-link">
                  <Link to="/signup" className="link-text">Get Started</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
        </Slider>
{/* This is a section  for an add. */}
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


      {/* Features Section with Carousel */}
      <section className="features">
        <h2>Our Features</h2>
        <Slider {...featureSettings}>
          {featureSlides.map((slide, index) => (
            <div key={index} className="feature-slide">
              <div className="feature-item">
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
        </Slider>
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
