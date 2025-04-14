import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from './image.png';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Myopique Logo" className="logo-img" />
        <div className="logo-text">
          <span>Myopique</span>
          <p className="tagline">Fix the Blur. Flex the View.</p>
        </div>
      </div>
      <div className="auth-buttons">
        <button className="login-btn" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="signup-btn" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;