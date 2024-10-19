import React, {useContext} from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import './App.css';
import { UserContext } from './UserContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLoginSuccess = (response) => {
    const token = response.credential;
    localStorage.setItem('token', token);

    const decodedUser = jwtDecode(token);
    setUser(decodedUser);

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
