import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getRoles, deleteRole } from '../api/roleApi';
import AddEditRoleForm from './AddEditRoleForm';

const RoleManagement = () => {
  const { user } = useContext(AuthContext);
  const [roles, setRoles] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      if (user?.token) {
        try {
          const data = await getRoles(user.token);
          setRoles(data);
        } catch (error) {
          console.error('Error fetching roles:', error);
        }
      }
    };
    fetchRoles();
  }, [user]);

  const handleRoleAdded = (role) => {
    setRoles((prevRoles) => [...prevRoles, role]);
    setShowModal(false);
  };

  const handleRoleUpdated = (updatedRole) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => (role._id === updatedRole._id ? updatedRole : role))
    );
    setEditingRole(null);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (user && user.token) {
      if (window.confirm('Are you sure you want to delete this role?')) {
        try {
          await deleteRole(id, user.token);
          setRoles((roles) => roles.filter((role) => role._id !== id));
        } catch (error) {
          console.error('Error deleting role:', error);
          alert('Error deleting role: ' + (error.response?.data?.message || error.message));
        }
      }
    }
  };

  const openAddModal = () => {
    setEditingRole(null);
    setShowModal(true);
  };

  const openEditModal = (role) => {
    setEditingRole(role);
    setShowModal(true);
  };

  const openPermissionModal = (role) => {
    setEditingRole(role); 
    setShowModal(true);
  };

  const nonEditableRoles = ['admin', 'Admin', 'developer', 'Developer', 'Project Managers', 'Client', 'User', 'user'];

  if (!user || !user.token) {
    return <p>Please log in to view roles.</p>;
  }

  return (
    <div>
      <h2>Roles</h2>
      <button className="btn btn-primary mb-3" onClick={openAddModal}>
        Add Role
      </button>

      <table className="table table-striped table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role._id}>
              <td>{role.name}</td>
              <td>
                
              {nonEditableRoles.includes(role.name) && (
                
                <button
                  onClick={() => openPermissionModal(role)}
                  className="btn btn-info btn-sm me-2"
                >
                  Permission
                </button>
              )}
                {!nonEditableRoles.includes(role.name) && (
                  <>
                    <button
                      onClick={() => openEditModal(role)}
                      className="btn btn-secondary btn-sm me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(role._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: '#000000a6' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingRole ? 'Edit Role' : 'Add Role'}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <AddEditRoleForm
                  role={editingRole}
                  onRoleSaved={editingRole ? handleRoleUpdated : handleRoleAdded}
                  onClose={() => setShowModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
