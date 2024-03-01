import React, { useState } from 'react';
import './Login.css'; 
import { FaUser, FaLock } from "react-icons/fa";
import Menu from './Menu';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); 
  const [error, setError] = useState(null); 


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const lowercaseUsername = username.toLowerCase();
    const lowercasePassword = password.toLowerCase();

    if (lowercaseUsername === 'dhruv' && lowercasePassword === 'pandey') {
      setLoggedIn(true);
      setError('');
    }
     else {
      setError('Wrong username or password. Please try again.');
        }
  };

  return (
    <div className='wrapper'>
      {loggedIn ? (
        <Menu />
      ) : (
        // Render login form if not logged in
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
            <FaUser className='icon'/>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <FaLock className='icon'/>
          </div>
          {error && <p className="error">{error}</p>} {/* Display error message */}
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
