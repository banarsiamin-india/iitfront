import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { addSkill, updateSkill } from '../api/skillApi';

const SkillForm = ({ skill, onSuccess, onCancel }) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(skill ? skill.name : '');

  // Set form title and function for API call based on mode
  const isEditMode = Boolean(skill);
  const formTitle = isEditMode ? 'Edit Skill' : 'Add Skill';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = isEditMode 
        ? await updateSkill(skill._id, { name }, user.token)
        : await addSkill({ name }, user.token);
        
      onSuccess(result);
      setName('');
    } catch (error) {
      console.error(error);
      alert(`Failed to ${isEditMode ? 'update' : 'add'} skill.`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {isEditMode ? 'Update Skill' : 'Add Skill'}
      </button>
      <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default SkillForm;
