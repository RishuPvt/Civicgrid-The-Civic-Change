import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import './LoginPage.css'; // The important import

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    console.log({ email, password });
  };

  return (
    <div className="login-container"> {/* The important className */}
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login to CivicGrid</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p style={{ textAlign: 'center' }}>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;