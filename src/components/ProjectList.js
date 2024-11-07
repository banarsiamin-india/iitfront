import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getProjects, deleteProject } from '../api/projectApi';
import AddProjectForm from './AddProjectForm';
import EditProjectForm from './EditProjectForm';

const ProjectList = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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
      if (window.confirm('Are you sure you want to delete this project0?'+id)) {
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
  
  const handleProjectAdded = (project) => {
    setProjects([...projects, project]);
    setShowAddModal(false); // Close modal on successful add
  };

  const handleProjectUpdated = (updatedProject) => {
    setProjects(
      projects.map((project) =>
        project._id === updatedProject._id ? updatedProject : project
      )
    );
    setEditingProject(null);
    setShowEditModal(false); // Close modal on successful edit
  };

  if (!user || !user.token) {
    return <p>Please log in to view your projects.</p>;
  }

  return (
    <div>
      <h2>Projects</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowAddModal(true)}>
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
                  onClick={() => {
                    setEditingProject(project);
                    setShowEditModal(true);
                  }}
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

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: '#000000a6' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Project</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <AddProjectForm onProjectAdded={handleProjectAdded} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: '#000000a6' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Project</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {editingProject && (
                  <EditProjectForm
                    project={editingProject}
                    onProjectUpdated={handleProjectUpdated}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
