// src/components/Navbar.js
import React from 'react';
import {  useNavigate } from 'react-router-dom';
import './Navbar.css'; // Create a CSS file for custom styles
import calender from '../assets/calender.png';
const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div  className='calender-icon'>
        <img src={calender} alt='Calender'/>
        </div>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <div className='logout'>
          <button onClick={onLogout}>Logout</button>
          </div>
        ) : (
            <div className='credentials'>
            <button onClick={()=>navigate("/login")}>Login </button>
            <button onClick={()=>navigate("/signup")}>Signup </button>
            </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
