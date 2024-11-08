// ProjectForm.js
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { addProject, updateProject } from '../api/projectApi';

const ProjectForm = ({ project, onSave, onClose }) => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [status, setStatus] = useState(project?.status || 'Pending');
  const [error, setError] = useState('');

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setStatus(project.status);
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (project) {
        // Edit mode
        const updatedProject = await updateProject(project._id, { title, description, status }, user.token);
        onSave(updatedProject);
      } else {
        // Add mode
        const newProject = await addProject({ title, description, status }, user.token);
        onSave(newProject);
      }
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Failed to save project');
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
          <option value="Pending">Pending</option>
          <option value="In progress">In progress</option>
          <option value="Completed">Completed</option>
          <option value="Archived">Archived</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        {project ? 'Update Project' : 'Add Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
