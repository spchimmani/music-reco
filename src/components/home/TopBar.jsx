// src/components/TopBar.jsx
import React from 'react';
import '../../css/home/TopBar.css'; // Optional: separate styling if desired
const TopBar = () => {
  return (
    <header className="top-bar">
      <div className="branding">
        <img src="/logo.png" alt="My Music App Logo" className="logo" />
        <h1>My Music App</h1>
      </div>
      <div className="search-auth">
        <input type="text" placeholder="Search music..." className="search-bar" />
        <div className="auth-options">
          <button>Login</button>
          <button>Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;