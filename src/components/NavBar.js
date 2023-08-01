import React from 'react';
import { FaSun, FaChevronLeft } from 'react-icons/fa';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <button
        type="button"
        className="back-btn"
        onClick={() => {
          navigate('/');
        }}
      >
        <FaChevronLeft />
      </button>
      <button
        type="button"
        className="color-toggle"
        onClick={() => {
          // change root color
          const root = document.documentElement;
          const color = root.style.getPropertyValue('--primary');
          if (color === '#e84e8a') {
            root.style.setProperty('--primary', '#4368b3');
          } else {
            root.style.setProperty('--primary', '#e84e8a');
          }
        }}
      >
        <FaSun className="color-icon" />
      </button>
    </nav>
  );
};

export default NavBar;
