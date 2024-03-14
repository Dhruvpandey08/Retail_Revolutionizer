import React from 'react';
import './Navbar.css'; 
import 'font-awesome/css/font-awesome.min.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="logo.png" alt="Sales Predictor Logo" />
        <span>Retail Revolutionizer</span>
      </div>
      <ul className="nav-links">
        <li><a href="/"><i className="fa fa-fw fa-home"></i> Home</a></li>
        <li><a href="./About"><i className="fa fa-fw fa-info-circle"></i> About</a></li>
        <li><a href="./Contact"><i className="fa fa-fw fa-envelope"></i> Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;