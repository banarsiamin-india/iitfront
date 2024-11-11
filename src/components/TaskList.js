// src/components/TaskList.js
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getTasks, deleteTask } from '../api/taskApi';
import { getProjects } from '../api/projectApi';
import { fetchUsers } from '../api/userApi';
import TaskForm from './TaskForm';
import { Badge } from 'react-bootstrap';

const TaskList = () => {
  const { user,token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const data = await getTasks(token, selectedProject);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  
  useEffect(() => {
    const fetchProjectsAndUsers = async () => {
      try {
        const [projectData, userData] = await Promise.all([
          getProjects(token),
          fetchUsers(token),
        ]);
        setProjects(projectData);
        setUsers(userData.data || userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProjectsAndUsers();
    fetchTasks();
  }, [user, selectedProject]);

  const handleProjectChange = (e) => setSelectedProject(e.target.value);

  const handleAddTask = () => {
    setCurrentTask(null);
    setShowModal(true);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(user.token, taskId);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentTask(null);
  };

  return (
    <div>
      <h2>Tasks</h2>
      <div className="mb-3">
        <label className="form-label">Filter by Project</label>
        <select
          className="form-control"
          value={selectedProject}
          onChange={handleProjectChange}
        >
          <option value="">All Projects</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary mb-3" onClick={handleAddTask}>
        Add Task
      </button>

      <table className="table table-striped table-hover mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Assigned User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.assignedUser?.name || 'Unassigned'}
                  {task?.assignedUser && task.assignedUser.length > 0 ? (
                    task.assignedUser.map((user, index) => {
                      const lastIndex = task.assignedUser.length - 1;
                      return (
                        <span key={user._id}>
                          <Badge pill bg="info" text="dark">
                            {user.name}
                          </Badge>
                          {index === lastIndex - 1 && task.assignedUser.length > 1 ? ' ' : index < lastIndex ? '  ' : ''}
                        </span>
                      );
                    })
                  ) : (
                    'No assignedUser'
                  )}
              </td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEditTask(task)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteTask(task._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <TaskForm
                currentTask={currentTask}
                onClose={closeModal}
                refreshTasks={fetchTasks}
                projects={projects}
                users={users}
                token={token}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
