import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import './Header.css';
import { FaHome, FaQuestionCircle, FaUserTie, FaUserAlt } from "react-icons/fa";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { IoMdBook } from 'react-icons/io';
import logo from '../../assets/logo.png';

function Header() {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    
    // Show Toast Notification
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000, // Hide after 2 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });

    // Redirect to login after a short delay
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

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
            <MdOutlineFeaturedPlayList className='fs-5 text-dark' /> Features
          </a>
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
          <Link to="/dashboard/aboutus" className='nav-link text-white' aria-label="About Us">
            <FaQuestionCircle className='fs-5 text-dark' /> About Us
          </Link>
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
      
      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Header;
