import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'; // We can reuse the same CSS!

function RegistrationPage() {
  // 1. Set up state for three fields now
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // 2. Simple validation for all three fields
    if (!displayName || !email || !password) {
      alert('Please fill out all fields.');
      return;
    }

    // 3. Log the new user's data to the console
    console.log('New user signed up!');
    console.log({
      displayName: displayName,
      email: email,
      password: password,
    });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Create an Account</h2>

        {/* 4. Add the Display Name field */}
        <div className="form-group">
          <label>Display Name</label>
          <input
            type="text"
            placeholder="Your Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
        
        {/* 5. Add a link back to the Login page */}
        <p style={{ textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegistrationPage;