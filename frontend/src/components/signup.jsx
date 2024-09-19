/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import './styles/signup.css';
// To understand how it translate to this palce
function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
      });
      if (response.status === 201) {
        alert('Account created successfully!');
      }
    } catch (error) {
      console.error('There was an error creating the account!', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create your account</h2>
        <p>Have an account? <a href="/signin">Log in now</a></p>
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
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
      <div className="signup-banner">
        <h2>Welcome!</h2>
        <p>Create an account to enjoy our services.</p>
      </div>
    </div>
  );
}

export default SignUp;
