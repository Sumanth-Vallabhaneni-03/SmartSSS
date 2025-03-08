import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; // Import Lucide icons
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    const { name, email, password, confirmPassword, termsAccepted } = formData;

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!termsAccepted) newErrors.termsAccepted = "You must accept the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { data } = await axios.post("https://smart-sss.vercel.app/", formData);
      toast.success("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="signup-section">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar /><br />
      <div className="signup-navbar">Welcome to SmartBridge</div><br /><br />
      <div className="signup-container">
        <h1 className="signup-title">Create an Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className={`form-control ${errors.name ? "input-error" : ""}`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className={`form-control ${errors.email ? "input-error" : ""}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group relative">
            <i className="fas fa-lock"></i>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className={`form-control ${errors.password ? "input-error" : ""}`}
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="eye-button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className="form-group relative">
            <i className="fas fa-key"></i>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className={`form-control ${errors.confirmPassword ? "input-error" : ""}`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="eye-button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          </div>

          <div className="checkbox-group">
            <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
            <label>
              I agree to the <a href="https://docs.google.com/document/d/1PHqNw4xWGYibMis0X97Wp2c16mxFVW8U93KR2XwEOfU/edit?tab=t.0" target="_blank" rel="noopener noreferrer">Terms of Service</a>
            </label>
          </div>
          {errors.termsAccepted && <p className="error-text">{errors.termsAccepted}</p>}

          <button type="submit" className="submit-button">Sign Up</button>
        </form>

        <p className="login-text">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
