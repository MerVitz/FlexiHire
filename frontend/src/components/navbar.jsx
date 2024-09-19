import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
  const [userType, setUserType] = useState(null); // Track the type of user
  const [notifications, setNotifications] = useState([]); // Store notifications
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false); // Track if "More" dropdown is open
  const navigate = useNavigate();

  // On component mount, check if the user is logged in
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
          'Authorization': `Bearer ${token}`,
        },
      });
      setNotifications(response.data); // Set fetched notifications to state
    } catch (error) {
      console.error('Error fetching notifications:', error.response ? error.response.data : error.message);
    }
  };

  // Logout handler: removes user session from localStorage
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('user_type'); // Remove user type from localStorage
    setIsLoggedIn(false); // Set login state to false
    setUserType(null); // Reset user type
    navigate('/'); // Redirect to the home page
  };

  // Toggle the More dropdown
  const toggleMoreDropdown = () => {
    setIsMoreDropdownOpen(!isMoreDropdownOpen); // Toggle the dropdown visibility
  };

  return (
    <header className="header">
      <div className="navbar-container">
        <div className="nav">
          <nav className="navbar navbar-expand-lg navbar-light sticky-top">
            <div className="container-fluid">
              <Link className="navbar-brand text-white fw-bold" to="/">FlexiHire</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/about">About</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/contact">Contact</Link>
                  </li>

                  {/* Notifications */}
                  {isLoggedIn && (
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="#">
                        Notifications <span className="badge bg-danger">{notifications.length}</span>
                      </Link>
                    </li>
                  )}

                  {/* Search functionality */}
                  {isLoggedIn && (
                    <li className="nav-item">
                      <input type="text" placeholder="Search..." className="form-control" style={{ maxWidth: '200px' }} />
                    </li>
                  )}

                  {/* More dropdown with Dashboard and Logout */}
                  {isLoggedIn && (
                    <li className="nav-item dropdown">
                      <a 
                        href="#"
                        className="nav-link dropdown-toggle text-white"
                        id="navbarDropdown"
                        role="button"
                        aria-expanded={isMoreDropdownOpen}
                        onClick={toggleMoreDropdown}
                      >
                        More
                      </a>
                      <div className={`dropdown-menu ${isMoreDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                        {userType === 'admin' ? (
                          <Link className='dropdown-item' to="/admin-dashboard">Dashboard</Link>
                        ): (
                          <Link className='dropdown-item' to="/custom-dashboard">Dashboard</Link>
                        )}
                        <a className='dropdown-item' onClick={handleLogout}>Logout</a>
                      </div>
                    </li>


                  )}

                  {/* Show Sign Up and Sign In buttons if not logged in */}
                  {!isLoggedIn && (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/signup">Register</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/signin">Login</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
