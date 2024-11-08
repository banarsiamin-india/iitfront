// src/components/TaskForm.js
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { addTask, updateTask } from '../api/taskApi'; // Update with the correct path
import { getProjects } from '../api/projectApi'; // Assuming you have a function to fetch projects

const TaskForm = ({ task, onSave, onClose }) => {
  const { user, user_permissions } = useContext(AuthContext);
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || 'Pending');
  const [priority, setPriority] = useState(task?.priority || 'Low');
  const [projectId, setProjectId] = useState(task?.project_id || '');
  const [assignedUserId, setAssignedUserId] = useState(task?.user || '');
  const [error, setError] = useState('');
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]); // Assuming user options can be fetched

  const hasPermission = (action) => {
    return user_permissions?.['task']?.includes(action);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await getProjects(user.token);
        setProjects(projectData);
      } catch (err) {
        console.error('Failed to load projects:', err);
      }
    };
    fetchProjects();
    
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
      setProjectId(task.project_id);
      setAssignedUserId(task.user);
    }
  }, [task, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!hasPermission(task ? 'edit' : 'add')) {
      setError('Permission denied');
      return;
    }

    try {
      const taskData = { title, description, status, priority, project_id: projectId, user: assignedUserId };
      if (task) {
        const updatedTask = await updateTask(task._id, taskData, user.token);
        onSave(updatedTask);
      } else {
        const newTask = await addTask(taskData, user.token);
        onSave(newTask);
      }
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Failed to save task');
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
          <option value="In Progress">In Progress</option>
          <option value="Overdue">Overdue</option>
          <option value="Needs info">Needs Info</option>
          <option value="Completed">Completed</option>
          <option value="In Review">In Review</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Priority</label>
        <select
          className="form-control"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Project</label>
        <select
          className="form-control"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Assigned User</label>
        <select
          className="form-control"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        {task ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
