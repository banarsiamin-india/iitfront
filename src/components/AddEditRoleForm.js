import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { addRole, updateRole } from '../api/roleApi';

const models = ['projects','tasks', 'comments', 'users', 'roles','skills','reports','settings']; // List of models
const actions = ['read', 'add', 'edit', 'delete']; // List of actions

const AddEditRoleForm = ({ role, onRoleSaved, onClose }) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    if (role) {
      setName(role.name);
      setPermissions(role.permissions || {}); // Populate permissions if editing
    }
  }, [role]);

  useEffect(() => {
    console.log("Permissions updated:", permissions);
  }, [permissions]);
  // Handle change for checkboxes
  const handlePermissionChange = (model, action) => {
    setPermissions((prevPermissions) => {
      // Ensure deep clone to avoid mutability issues
      const updatedPermissions = JSON.parse(JSON.stringify(prevPermissions));
  
      // Initialize model actions array if it doesn't exist
      if (!updatedPermissions[model]) {
        updatedPermissions[model] = [];
      }
  
      // Add or remove the action from the model's permissions
      if (updatedPermissions[model].includes(action)) {
        updatedPermissions[model] = updatedPermissions[model].filter((perm) => perm !== action);
      } else {
        updatedPermissions[model].push(action);
      }
  
      return updatedPermissions;
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const roleData = { name, permissions };
      const savedRole = role
        ? await updateRole(role._id, roleData, user.token)
        : await addRole(roleData, user.token);
      onRoleSaved(savedRole);
      setName('');
      setPermissions({});
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message);
      // alert(`Failed to ${role ? 'update' : 'add'} role.`);
    }
  };
  const noteditable = ['Admin', 'Developer', 'Project Managers', 'Client', 'User'];

  return (
    <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Name</label>
        
        
          {noteditable.includes(name) ? (
              <input
                type="text"
                className="form-control"
                value={name}
                readOnly
              />
            ) : (
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

      </div>

      <div className="mb-3">
        <label className="form-label">Permissions</label>
        <div>
          {models.map((model) => (
            <div key={model} className="mb-2">
              <strong>{model.charAt(0).toUpperCase() + model.slice(1)}</strong>
              <div className="d-flex">
                {actions.map((action) => (
                  <div key={`${model}-${action}`} className="form-check me-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`${model}-${action}`}
                      checked={permissions[model]?.includes(action) || false}
                      onChange={() => handlePermissionChange(model, action)}
                    />
                    <label className="form-check-label" htmlFor={`${model}-${action}`}>
                      {action.charAt(0).toUpperCase() + action.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        {role ? 'Update Role' : 'Add Role'}
      </button>
    </form>
  );
};

export default AddEditRoleForm;
