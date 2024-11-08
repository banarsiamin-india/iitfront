import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { addProject } from '../api/projectApi';

const AddProjectForm = ({ onProjectAdded }) => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const project = await addProject({ title, description, status }, user.token);
      onProjectAdded(project); // Notify parent component
      setTitle('');
      setDescription('');
      setStatus('pending');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message);


      // alert('Failed to add project.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-control"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Add Project</button>
    </form>
  );
};

export default AddProjectForm;
