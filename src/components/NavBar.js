import React from 'react';
import { FaSearch, FaChevronLeft } from 'react-icons/fa';
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
      <h2>All Zones</h2>
      <FaSearch className="search-icon" />
    </nav>
  );
};

export default NavBar;
