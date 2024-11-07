import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Add a new skill
export const addSkill = async (skill, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(`${API_URL}api/skills`, skill, config);
  return data;
};

// Get all skills
export const getSkills = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(`${API_URL}api/skills`, config);
  return data;
};

// Update an existing skill
export const updateSkill = async (id, skill, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(`${API_URL}api/skills/${id}`, skill, config);
  return data;
};

// Delete a skill
export const deleteSkill = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.delete(`${API_URL}api/skills/${id}`, config);
  return data;
};
