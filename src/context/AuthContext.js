// src/context/AuthContext.js
import React, { createContext, useReducer, useEffect } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'SET_SUCCESS':
        return { ...state, error: action.payload }; // Handle error state
    case 'SET_ERROR':
      return { ...state, error: action.payload }; // Handle error state
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, error: null, success: null });
  // const [state, dispatch] = useReducer(authReducer, { user: null, error: null });
  // const [state, dispatch] = useReducer(authReducer, initialState);
  // const [state, dispatch] = useReducer(authReducer, { user: null });
  const navigate = useNavigate();

  // const navigate = useNavigate();

  // Inside the AuthProvider
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);


  // const login = async (email, password) => {
  //   const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/users/login`, { email, password });
  //   localStorage.setItem('user', JSON.stringify(data));
  //   dispatch({ type: 'LOGIN', payload: data });
  //   navigate('/profile');
  // };
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/users/login`, { email, password });

      console.log('login api',data);
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: 'LOGIN', payload: data });
      navigate('/profile');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Login failed' });
    }
  };


  const register = async (name, email, phone, password) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/users/register`, { name, email, phone, password });
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: 'LOGIN', payload: data });
      navigate('/profile');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Registration failed' });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  // Define your forget password function
  const forgetPwd = async (email) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/users/forgetPassword`, { email });
      
      console.log('Forget Password API response:', data);

      // Optional: Show a success notification or alert to the user
      dispatch({ type: 'SET_SUCCESS', payload: data?.message ||'Password reset link sent to your email.' });
      // dispatch({ type: 'SET_SUCCESS', payload: data.message?.data?.message ||'Password reset link sent to your email.' });

    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.message || 'Failed to send reset link. Please try again.',
      });
    }
  };


  return (
    <AuthContext.Provider
    value={{
      user_role: state.user?.user_role, // Access token directly from the user object
      user_permissions: state.user?.user_permissions,
      user_skills: state.user?.user_skills, // Access token directly from the user object
      token: state.user?.token, // Access token directly from the user object
      user: state.user,
      error: state.error,
      success: state.success,
      login,
      register,
      logout,
      forgetPwd,
      dispatch,
    }}
  >
    {children}
  </AuthContext.Provider>
  );
  
};

export { AuthContext, AuthProvider };
