// src/api/taskApi.js
// api/taskApi.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

  


export const getTasks = async (token, projectId = '') => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { project_id: projectId }, // Add projectId as query parameter if provided
  };

  const { data } = await axios.get(`${API_URL}api/tasks`, config);
  return data;
};

export const updateTask = async (id, task, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(`${API_URL}api/tasks/${id}`, task, config);
  return data;
};
export const addTask = async (task, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`${API_URL}api/tasks`, task, config);
    return data;
  };

export const deleteTask = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.delete(`${API_URL}api/tasks/${id}`, config);
  return data;
};
