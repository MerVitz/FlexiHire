// src/components/Navbar.jsx
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in local storage
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('user_type'); // Assuming user_type is stored in local storage
    if (token) {
      setIsLoggedIn(true);
      setUserType(userType);
    } else {
      setIsLoggedIn(false);
      setUserType(null);
    }
  }, []);

  const handleLogout = () => {
    // Remove token and user_type from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
    setIsLoggedIn(false);
    setUserType(null);
    navigate('/signin');
  };

  return (
    <nav>
      <ul>
        {!(isLoggedIn && userType === 'admin') && (
          <li><Link to="/">Home</Link></li>
        )}
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
        {isLoggedIn && userType === 'admin' && (
          <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
        )}
        {isLoggedIn && (
          <>
            <li><button className="profile">Profile</button></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </>
        )}
        {!isLoggedIn && (
          <li className="auth-buttons">
            <Link to="/signup" className="signup-button">Sign Up</Link>
            <Link to="/signin" className="signin-button">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
