// src/components/UserManagement.js
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchUsers, deleteUser } from '../api/userApi';
import UserForm from './UserForm';
// import { getRoles } from '../api/roleApi';
import { Badge } from 'react-bootstrap';

const UserManagement = () => {
  const { user, token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // const [roles, setRoles] = useState([]);
  const[erroru,setErroru]=useState('');

   useEffect(() => {
    if (user) {
      const loadUsers = async () => {
        try {
          const { data } = await fetchUsers(token);
          setUsers(data);
        } catch (error) {
          console.error('Error fetching users:', error);
          setErroru(error.response?.data?.message || 'Error fetching users');

        }
      };
      loadUsers();
    }
  }, [user,token]);

  const handleDelete = async (id) => {
    if (token && window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id, token);
        setUsers(users.filter((u) => u._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
        setErroru(error.response?.data?.message || 'Error deleting user');

      }
    }
  };

  const handleUserSaved = (savedUser) => {
    if (editingUser) {
      setUsers(users.map((u) => (u._id === savedUser._id ? savedUser : u)));
      setEditingUser(null);
    } else {
      setUsers([...users, savedUser]);
    }
    
    setShowModal(false);
  };

  return (
    <div>
      <h2>Users</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Add User
      </button>
      {erroru && <div className="alert alert-danger">{erroru}</div>}

      <table className="table table-striped table-hover mt-3 ">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Skills</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                {u.skills && u.skills.length > 0 ? (
                  u.skills.map((skill) => (
                    <Badge bg="info text-capitalize" key={skill._id}>
                      {skill.name}
                    </Badge>
                  ))
                ) : (
                  'No skills'
                )}
              </td>
              <td className='text-capitalize'><Badge bg="success">{u.roles?.name || 'No role assigned'}</Badge></td>
              <td>
                {(u.roles?.name !== 'admin' && u.roles?.name !== 'Admin' ) && (
                  <>
                <button
                  onClick={() => {
                    setEditingUser(u);
                    setShowModal(true);
                  }}
                  className="btn btn-secondary btn-sm me-2"
                >
                  Edit
                </button>
                <button
                    onClick={() => handleDelete(u._id)}
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
                <h5 className="modal-title">{editingUser ? 'Edit User' : 'Add User'}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <UserForm
                  user={editingUser}
                  onUserSaved={handleUserSaved}
                  onClose={() => {
                    setShowModal(false);
                    setEditingUser(null);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
