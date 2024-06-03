// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.css';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
        <li className="auth-buttons">
          <Link to="/signup" className="signup-button">Sign Up</Link>
          <Link to="/signin" className="signin-button">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
