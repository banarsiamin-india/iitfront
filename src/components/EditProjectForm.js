import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { updateProject } from '../api/projectApi';

const EditProjectForm = ({ project, onProjectUpdated }) => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedProject = await updateProject(project._id, { title, description, status }, user.token);
      onProjectUpdated(updatedProject); // Notify parent component
    } catch (error) {
      console.error(error);
      alert('Failed to update project.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit" className="btn btn-primary">Update Project</button>
    </form>
  );
};

export default EditProjectForm;
