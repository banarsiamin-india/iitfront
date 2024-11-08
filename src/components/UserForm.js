import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createUser, updateUser } from '../api/userApi';
import { getRoles } from '../api/roleApi';

const UserForm = ({ user, onUserSaved, onClose }) => {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', roles: '' });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const dataR = await getRoles(token);
        setRoles(dataR);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();

    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: '',
        roles: user.roles?._id || '' // Set form.roles to the role's _id if it exists
      });
    }
  }, [user, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (user) {
        response = await updateUser(user._id, form, token);
      } else {
        response = await createUser(form, token);
      }

      onUserSaved(response.data);
      onClose();
      setForm({ name: '', email: '', phone: '', password: '', roles: '' });
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Failed to save user');
      // alert('Failed to save user.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          className="form-control"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          className="form-control"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          className="form-control"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          className="form-control"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Roles</label>
        <select
          className="form-control"
          name="roles"
          value={form.roles}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select a role</option>
          {roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        {user ? 'Save Changes' : 'Add User'}
      </button>
      {error && <div className="alert alert-danger">{error}</div>}
    </form>
  );
};

export default UserForm;
