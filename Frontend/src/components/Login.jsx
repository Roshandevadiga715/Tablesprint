import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate ,Link } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:4001/login', {
        email,
        password,
      });
      console.log(res.data.token);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setIsLoggedIn(true);
        navigate('/Dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="container">
      <form className="form-wrapper" onSubmit={handleLogin}>
        <div className="logo">
          <img src="logo.png" alt="TableSprint Logo" />
        </div>
        <h2 className="title">Welcome to TableSprint admin</h2>
        <div className="input-wrapper">
          <input 
            type="email" 
            placeholder="Email-id" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="password-icon" onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <a className="forgot-password" href="#">Forgot Password?</a>
        <button className="button" type="submit">Log In</button>
      </form>
      <p>
          Don't have an account?{' '}
          <Link to="/Signup">Sign up</Link>
        </p>
      
    </div>
  );
};

export default Login;

