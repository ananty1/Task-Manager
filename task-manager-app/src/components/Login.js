// src/components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { GoogleLogin } from '@react-oauth/google';

const Login = ({ onLogin, onGoogleLogin }) => {

  const handleGoogleSuccess = (response) => {
    onGoogleLogin(response.credential);
  };

  const handleGoogleFailure = (error) => {
    console.error(error);
  };

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
        {/* <button type="button" className="google-login"> */}
        <GoogleLogin onSuccess={handleGoogleSuccess} onFailure={handleGoogleFailure} />
        {/* </button> */}
      </form>
    </div>
  );
};

export default Login;
