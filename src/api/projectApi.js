import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const addProject = async (project, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(`${API_URL}api/projects`, project, config);
  return data;
};

export const getProjects = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(`${API_URL}api/projects`, config);
  return data;
};

export const updateProject = async (id, project, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(`${API_URL}api/projects/${id}`, project, config);
  return data;
};

export const deleteProject = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.delete(`${API_URL}api/projects/${id}`, config);
  return data;
};
