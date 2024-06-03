// eslint-disable-next-line no-unused-vars
import React from 'react';
import './styles/footer.css';

function Footer() {
  return (
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
  );
}

export default Footer;
