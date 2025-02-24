import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaHome, FaQuestionCircle, FaUserTie, FaUserAlt } from "react-icons/fa";
import { TiHome } from 'react-icons/ti'; 
import { IoMdBook } from 'react-icons/io';
import logo from '../../assets/logo.png';

function Header() {
  return (
    <div className='header'>
      <img src={logo} alt="SmartBridge Logo" className="logo-image" />
      <h1 className='text-white'><strong>SmartBridge</strong></h1> 
      <ul className='nav fs-5 p-3'>

        <li>
          <Link to="/dashboard" className='nav-link text-white' aria-label="Home">
            <FaHome className='fs-5 text-dark' /> Home
          </Link>
        </li>

        <li>
          <a 
            href="#features" 
            className='nav-link text-white' 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("features").scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Features"
          >
            <TiHome className='fs-5 text-dark' /> Features
          </a>
        </li>

        <li>
          <Link to="/dashboard/aboutus" className='nav-link text-white' aria-label="About Us">
            <FaQuestionCircle className='fs-5 text-dark' /> About Us
          </Link>
        </li>

        <li>
          <a 
            href="#steps" 
            className='nav-link text-white' 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("steps").scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Steps"
          >
            <IoMdBook className='fs-5 text-dark' /> Steps
          </a>
        </li>

        <li>
          <Link to="/dashboard/mentors" className='nav-link text-white' aria-label="Mentors">
            <FaUserTie className='fs-5 text-dark' /> Mentors
          </Link>
        </li>

        <li>
          <Link to="/dashboard/profile" className='nav-link text-white' aria-label="Profile">
            <FaUserAlt className='fs-5 text-dark' /> Profile
          </Link>
        </li>

      </ul>
      <div className="login-btn-container"></div>
    </div>
  );
}

export default Header;
