import React, { useState } from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();


  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const res = await axios.post('http://localhost:4001/signup', {
        email,
        password,
      });
      console.log("response:",res);

      if (res.status === 200) {
        alert('Sign up successful! Please log in.');
        navigate('/');
      } else {
        alert('Sign up failed');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert(`An error occurred during sign up: ${error.message}`);
    }
  };
  
  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="logo">
          <img src="logo.png" alt="TableSprint Logo" />
        </div>
        <h2 className="title">Sign Up for TableSprint</h2>
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="button" onClick={handleSignUp}>Sign Up</button>
      </div>
      <p>
          Already have an account?{' '}
          <Link to="/">Log in</Link>
        </p>
    </div>
  );
};

export default SignUp;
