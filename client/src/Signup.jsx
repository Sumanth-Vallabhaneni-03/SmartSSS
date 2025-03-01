import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const result = await axios.post('http://localhost:3000/', formData);
      console.log(result.data);
      toast.success("Registration successful! Redirecting to login...");
      
      setTimeout(() => {
        navigate('/login'); 
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <section className="signup-section">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      
      <div className="signup-container">
        <h1 className="signup-title">Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <i className="fas fa-user"></i>
            <input type="text" name="name" placeholder="Your Name" className="form-control" value={formData.name} onChange={handleChange} />
          </div>
          {errors.name && <p className="error-text">{errors.name}</p>}

          <div className="form-group">
            <i className="fas fa-envelope"></i>
            <input type="email" name="email" placeholder="Your Email" className="form-control" value={formData.email} onChange={handleChange} />
          </div>
          {errors.email && <p className="error-text">{errors.email}</p>}

          <div className="form-group">
            <i className="fas fa-lock"></i>
            <input type="password" name="password" placeholder="Password" className="form-control" value={formData.password} onChange={handleChange} />
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}

          <div className="form-group">
            <i className="fas fa-key"></i>
            <input type="password" name="confirmPassword" placeholder="Repeat your password" className="form-control" value={formData.confirmPassword} onChange={handleChange} />
          </div>
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

          <div className="checkbox-group">
            <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
            <label>I agree to all statements in <a href="#!">Terms of service</a></label>
          </div>
          {errors.termsAccepted && <p className="error-text">{errors.termsAccepted}</p>}

          <button type="submit" className="submit-button">Register</button>
          <br/>
        </form>
        <p className="login-text">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </section>
  );
};

export default Signup;
