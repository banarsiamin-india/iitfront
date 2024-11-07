// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  // If user is not logged in, redirect to login
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

