/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('user_type');
    if (token) {
      setIsLoggedIn(true);
      setUserType(userType);
      fetchNotifications(token);
    } else {
      setIsLoggedIn(false);
      setUserType(null);
    }
  }, []);

  const fetchNotifications = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/api/notifications/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error.response ? error.response.data : error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
    setIsLoggedIn(false);
    setUserType(null);
    navigate('/');
  };

  return (
    <nav>
      <ul>
        {!isLoggedIn && (
          <li><Link to="/">Home</Link></li>
        )}
        {isLoggedIn && (
          <li><Link to="/home">Home</Link></li>
        )}
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {isLoggedIn && userType !== 'admin' && (
          <>
            <li className="dropdown">
              <button className="dropdown-toggle">Notifications</button>
              <div className="dropdown-menu">
                {notifications.length === 0 ? (
                  <p>No new notifications</p>
                ) : (
                  notifications.map((notification) => (
                    <div key={notification.id} className="dropdown-item">
                      {notification.message}
                    </div>
                  ))
                )}
              </div>
            </li>
            <li className="dropdown">
              <button className="dropdown-toggle">Profile</button>
              <div className="dropdown-menu">
                <Link to="/inbox" className="dropdown-item">Inbox</Link>
              </div>
            </li>
          </>
        )}
        {isLoggedIn && userType === 'admin' && (
          <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
        )}
        {isLoggedIn && (
          <>
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
