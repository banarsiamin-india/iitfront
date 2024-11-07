// src/components/Sidebar.js
import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user_permissions } = useContext(AuthContext);

  const hasPermission = (module, action) => {
    return user_permissions?.[module]?.includes(action);
  };

  return (
    <div className="bg-dark text-white p-0" style={{ width: '250px', minHeight: '100vh' }}>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link as={Link} to="/dashboard" className="text-white">Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/profile" className="text-white">Profile</Nav.Link>
        </Nav.Item>
        {hasPermission('projects', 'read') && (
        <Nav.Item>
          <Nav.Link as={Link} to="/projects" className="text-white">Projects</Nav.Link>
        </Nav.Item>
        )}

        {hasPermission('tasks', 'read') && (
        <Nav.Item>
          <Nav.Link as={Link} to="/tasks" className="text-white">Tasks</Nav.Link>
        </Nav.Item>
        )}

        {hasPermission('users', 'read') && (
          <Nav.Item>
            <Nav.Link as={Link} to="/users" className="text-white">Users</Nav.Link>
          </Nav.Item>
        )}
        {hasPermission('roles', 'read') && (
          <Nav.Item>
            <Nav.Link as={Link} to="/roles" className="text-white">Roles</Nav.Link>
          </Nav.Item>
        )}
        {hasPermission('settings', 'read') && (
          <Nav.Item>
            <Nav.Link as={Link} to="/settings" className="text-white">Settings</Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;
