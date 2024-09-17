import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
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

  // Toggle the Notification Dropdown
  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    setIsProfileDropdownOpen(false);
  };

  // Toggle the Profile Dropdown
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsNotificationDropdownOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">FlexiHire</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            {isLoggedIn && userType !== 'admin' && (
              <>
                <li className="nav-item dropdown">
                  <a 
                    className="nav-link dropdown-toggle btn btn-link" 
                    onClick={toggleNotificationDropdown}
                    aria-expanded={isNotificationDropdownOpen}
                  >
                    Notifications
                  </a>
                  {isNotificationDropdownOpen && (
                    <ul className="dropdown-menu show">
                      {notifications.length === 0 ? (
                        <li className="dropdown-item">No new notifications</li>
                      ) : (
                        notifications.map((notification) => (
                          <li key={notification.id} className="dropdown-item">
                            {notification.message}
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </li>

                <li className="nav-item dropdown">
                  <a 
                    className="nav-link dropdown-toggle btn btn-link" 
                    onClick={toggleProfileDropdown}
                    aria-expanded={isProfileDropdownOpen}
                  >
                    Profile
                  </a>
                  {isProfileDropdownOpen && (
                    <ul className="dropdown-menu show">
                      <li>
                        <Link className="dropdown-item" to="/inbox">Inbox</Link>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            )}

            {isLoggedIn && userType === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-light">Logout</button>
              </li>
            )}
            {!isLoggedIn && (
              <li className="nav-item d-flex">
                <Link className="btn btn-warning me-2" to="/signup">Sign Up</Link>
                <Link className="btn btn-light" to="/signin">Sign In</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;