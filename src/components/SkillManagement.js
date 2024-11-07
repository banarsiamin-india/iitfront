import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getSkills, deleteSkill } from '../api/skillApi';
import SkillForm from './SkillForm';

const SkillManagement = () => {
  const { user, token } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user && token) {
      const fetchSkills = async () => {
        try {
          const data = await getSkills(token);
          setSkills(data);
        } catch (error) {
          console.error('Error fetching skills:', error);
        }
      };
      fetchSkills();
    }
  }, [user, token]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(id, token);
        setSkills(skills.filter((skill) => skill._id !== id));
      } catch (error) {
        console.error('Error deleting skill:', error);
        alert('Error deleting skill.');
      }
    }
  };

  const handleSuccess = (updatedSkill) => {
    if (editingSkill) {
      setSkills(skills.map(skill => skill._id === updatedSkill._id ? updatedSkill : skill));
    } else {
      setSkills([...skills, updatedSkill]);
    }
    setShowModal(false);
    setEditingSkill(null);
  };

  return (
    <div>
      <h2>Skills</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Add Skill
      </button>
      <table className="table table-striped table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill._id}>
              <td>{skill.name}</td>
              <td>
                <button
                  onClick={() => {
                    setEditingSkill(skill);
                    setShowModal(true);
                  }}
                  className="btn btn-secondary btn-sm me-2"
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(skill._id)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: '#000000a6' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingSkill ? 'Edit Skill' : 'Add Skill'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <SkillForm
                  skill={editingSkill}
                  onSuccess={handleSuccess}
                  onCancel={() => setShowModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillManagement;
