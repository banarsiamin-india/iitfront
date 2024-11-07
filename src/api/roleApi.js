import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Add a new role
export const addRole = async (role, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(`${API_URL}api/roles`, role, config);
  return data;
};

// Get all roles
export const getRoles = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(`${API_URL}api/roles`, config);
  return data;
};

// Update an existing role
export const updateRole = async (id, role, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(`${API_URL}api/roles/${id}`, role, config);
  return data;
};

// Delete a role
export const deleteRole = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.delete(`${API_URL}api/roles/${id}`, config);
  return data;
};
