/* eslint-disable no-unused-vars */
// src/components/SignIn.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/signin.css';

function SignIn() {
  const [email, setEmail] = useState('');``
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Accessing th login endpoint
      const response = await axios.post('http://localhost:8000/api/login/', { email, password });

      //Storing the users detials , used for a given session
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', response.data.user_id);
      localStorage.setItem('user_type', response.data.user_type);

      //Loggin gusers details for debugging.
      console.log('session user', response.data.user_id)
      console.log('Session token', response.data.token)
      console.log('session user type', response.data.user_type)

      // Redirect to home page if the user_type is 'admin' or 'customer'
      if (response.data.user_type === 'admin' || response.data.user_type === 'customer') {
        navigate('/home');
      } else {
        // If user_type is invalid, clear the session and show an error message
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_type');
        setErrorMessage('There was a technical error. Please contact support.');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2>Log in to your account</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Don&#39;t have an account? <a href="/signup">Sign Up</a></p>
        <button className="social-login google">Google</button>
        <button className="social-login github">GitHub</button>
        <div className="separator">Or with email and password</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Log In</button>
        </form>
      </div>
      <div className="signin-banner">
        <h2>Welcome Back!</h2>
        <p>Log in to continue accessing your account and enjoy our services.</p>
      </div>
    </div>
  );
}

export default SignIn;
