import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Authenticate = ({ children }) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();
      
      if (isTokenExpired) {
        localStorage.removeItem('token');
        return <Navigate to="/login" />;
      }

      return children;

    } catch (error) {
      console.error('Token decoding failed: ', error);
      localStorage.removeItem('token');
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login " />;
  }
};

export default Authenticate;
