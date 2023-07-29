import React from 'react';
import { FaSearch, FaChevronLeft } from 'react-icons/fa';
import './NavBar.css';

const NavBar = () => (
  <nav className="navbar">
    <FaChevronLeft className="back-icon" />
    <h2>All Zones</h2>
    <FaSearch className="search-icon" />
  </nav>
);

export default NavBar;
