import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:3000/login', { email, password })
      .then((result) => {
        console.log(result.data);
        if (result.data === "Success") {
          toast.success("Login successful!"); 
           // ✅ Delay redirection by 3 seconds (3000ms)
           setTimeout(() => {
            navigate('/dashboard'); 
          }, 3000);
        } else if (result.data === "User doesn't exist, please register to login!") {
          toast.error("User does not exist! Please register."); 
        } else {
          toast.error("Incorrect password!"); 
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <div className="login-container">
      {/* ✅ Centered Toasts */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label></label>
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
          <label></label>
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

      {/* ✅ Signup Button */}
      <br/>
        <p>Don't have an account?</p>
        <button 
          className="btn btn-primary btn-block" 
          onClick={() => navigate('/')}
        >
          Sign Up
        </button>
    </div>
  );
};

export default Login;
