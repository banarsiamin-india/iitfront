import React, { useState, useEffect } from 'react';
import { addTask, updateTask } from '../api/taskApi';

const TaskForm = ({ currentTask, onClose, refreshTasks, projects, users, token }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    project_id: '',
    assignedusers: [], // Array for multiple users
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentTask) {
      setTaskData({
        title: currentTask.title || '',
        description: currentTask.description || '',
        status: currentTask.status || '',
        priority: currentTask.priority || '',
        project_id: currentTask.project_id || '',
        assignedusers: currentTask.assignedusers || [], // Ensure array format
      });
    }
  }, [currentTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentTask) {
        await updateTask(currentTask._id, { ...taskData }, token);
      } else {
        await addTask(taskData, token);
      }
      refreshTasks();
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
      setError(error.response?.data?.message || 'Error saving task');
    }
  };

  const handleUserChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setTaskData({ ...taskData, assignedusers: selectedOptions });
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">{currentTask ? 'Edit Task' : 'Add Task'}</h5>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={taskData.title}
              onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={taskData.description}
              onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
              required
            ></textarea>
          </div>

          {/* Project Selection */}
          <div className="mb-3">
            <label className="form-label">Project</label>
            <select
              className="form-control"
              value={taskData.project_id}
              onChange={(e) => setTaskData({ ...taskData, project_id: e.target.value })}
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

          {/* Assign Users (Multiple Selection) */}
          <div className="mb-3">
            <label className="form-label">Assign to Users</label>
            <select
              className="form-control"
              multiple
              value={taskData.assignedusers} // Bind to the assigned users array
              onChange={handleUserChange}
              required
            >
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={taskData.status}
              onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
              required
            >
              <option value="">Select Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
              <option value="Needs info">Needs info</option>
              <option value="Completed">Completed</option>
              <option value="In Review">In Review</option>
            </select>
          </div>

          {/* Priority */}
          <div className="mb-3">
            <label className="form-label">Priority</label>
            <select
              className="form-control"
              value={taskData.priority}
              onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
              required
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            {currentTask ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
