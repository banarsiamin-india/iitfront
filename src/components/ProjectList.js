// ProjectList.js
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getProjects, deleteProject } from '../api/projectApi';
import ProjectForm from './ProjectForm';

const ProjectList = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      const fetchProjects = async () => {
        try {
          const data = await getProjects(user.token);
          setProjects(data);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };
      fetchProjects();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (user && user.token) {
      if (window.confirm('Are you sure you want to delete this project?')) {
        try {
          await deleteProject(id, user.token);
          setProjects(projects.filter((project) => project._id !== id));
        } catch (error) {
          console.error('Error deleting project:', error.response?.data || error.message);
          alert('Error deleting project: ' + (error.response?.data?.message || error.message));
        }
      }
    }
  };

  const handleSaveProject = (savedProject) => {
    if (currentProject) {
      setProjects(
        projects.map((project) => 
          project._id === savedProject._id ? savedProject : project
        )
      );
    } else {
      setProjects([...projects, savedProject]);
    }
    setShowModal(false);
  };

  const openAddModal = () => {
    setCurrentProject(null);
    setShowModal(true);
  };

  const openEditModal = (project) => {
    setCurrentProject(project);
    setShowModal(true);
  };

  if (!user || !user.token) {
    return <p>Please log in to view your projects.</p>;
  }

  return (
    <div>
      <h2>Projects</h2>
      <button className="btn btn-primary mb-3" onClick={openAddModal}>
        Add Project
      </button>

      <table className="table table-striped table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.status}</td>
              <td>
                <button
                  onClick={() => openEditModal(project)}
                  className="btn btn-secondary btn-sm me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Project Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: '#000000a6' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentProject ? 'Edit Project' : 'Add Project'}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <ProjectForm
                  project={currentProject}
                  onSave={handleSaveProject}
                  onClose={() => setShowModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
