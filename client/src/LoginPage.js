import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import './App.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    const token = response.credential;
    localStorage.setItem('t oken', token);

    const decodedUser = jwtDecode(token);
    console.log('User info:', decodedUser);

    navigate('/');
  };

  const handleLoginFailure = (error) => {
    console.log('Login Failed: ', error);
  };

  return (
    <GoogleOAuthProvider clientId="687995268774-3e083uvrq99ojt97r0v6spiqlrpn5ila.apps.googleusercontent.com">
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Welcome to Budgeting</h2>
          <p className="login-subtitle">Sign in to continue</p>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            className="google-button"
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
