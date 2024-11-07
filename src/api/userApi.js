// src/api/userApi.js
import axios from 'axios';

// Configure Axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Set this in your .env file
});

// Get all users
export const fetchUsers = async (token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

  return await api.get('/api/users/getallusers',config);
};


// Get a single user by ID
export const fetchUserById = async (id,token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  return await api.get(`/admin/users/${id}`, config);
};

// Create a new user
export const createUser = async (userData,token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  return await api.post('/api/users/createuser', userData, config);
};

// Update a user
export const updateUser = async (id, userData,token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  return await api.put(`/api/users/updateuserbyid/${id}`, userData, config);
};

// Delete a user
export const deleteUser = async (id,token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  return await api.delete(`/api/users/deleteuserbyid/${id}`,config);
};
