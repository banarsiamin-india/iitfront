// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import ProfileUpdate from './components/ProfileUpdate';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';

import RoleManagement from './components/RoleManagement';
import SkillManagement from './components/SkillManagement';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

import PrivateRoute from './components/PrivateRoute';
import UserManagement from'./components/UserManagement';


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        {/* <div className="container"> */}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          

          {/* Redirect root ("/") to Dashboard if logged in, else Login */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          {/* <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} /> */}


          {/* Protected Routes - Wrapped in Admin Layout */}
          <Route element={<PrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/profile/update" element={<ProfileUpdate />} />
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/roles" element={<RoleManagement />} />
              <Route path="/skills" element={<SkillManagement />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
        {/* </div> */}
      </AuthProvider>
    </Router>
    
  );
};

export default App;
