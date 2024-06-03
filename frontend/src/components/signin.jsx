// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './styles/signin.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
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
