/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/signin.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_type', response.data.user_type); // Store user type in local storage
      if (response.data.user_type === 'admin') {
        navigate('/admin-dashboard');
      } else if (response.data.user_type === 'customer') {
        navigate('/home');
      }else{
        navigate('/');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2>Log in to your account</h2>
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
