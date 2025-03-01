import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { userLoginContext } from './contexts/UserLoginStore'; // Import context
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";

const Login = () => {
  const { setCurrentUser } = useContext(userLoginContext); // Get context function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:3000/login", { email, password });

      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
        setCurrentUser(result.data.user); // ✅ Store user in context
        console.log(result.data.user);
        toast.success("Login successful! Redirecting...");

        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        toast.error(result.data.error || "Login failed!");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>

      <br />
      <p>Don't have an account?</p>
      <button className="btn btn-primary btn-block" onClick={() => navigate('/')}>
        Sign Up
      </button>
    </div>
  );
};

export default Login;
