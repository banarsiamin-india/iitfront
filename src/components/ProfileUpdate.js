import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getSkills } from '../api/skillApi';

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const { user, dispatch, token } = useContext(AuthContext);
  const [name, setName] = useState(user?.user?.name || '');
  const [phone, setPhone] = useState(user?.user?.phone || '1234567890');
  const [skillss, setSkillss] = useState([]);
  const [skls, setSkls] = useState(user?.user?.skills || []);
  const [email, setEmail] = useState(user?.user?.email || '');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.user?.image || ''); // Existing image from the user profile
  const [error, setError] = useState('');
  const [errorp, setErrorp] = useState(''); // Phone validation error
  const [errore, setErrore] = useState(''); // Email validation error

  useEffect(() => {
    // Fetch skills once
    const fetchSkills = async () => {
      try {
        const dataS = await getSkills(token);
        setSkillss(dataS);
      } catch (error) {
        console.error('Error fetching Skills:', error);
      }
    };
    fetchSkills();
  }, [user, token]);

  useEffect(() => {
    if (token) {
      setName(user.user.name);
      setPhone(user.user.phone);
      setEmail(user.user.email);
      setSkls(user.user.skills);
      setPreview(`${process.env.REACT_APP_API_URL}uploads/${user.user.image}`); // Assume server image path is returned with user data
    }
  }, [user, token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create a preview of the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSkillsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedSkills = selectedOptions.map((option) => option.value);
    setSkls(selectedSkills);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      // Ensure the phone and email are valid before submission
      if (errorp || errore) {
        //alert('Please fix validation errors before submitting.');
        setError('Please fix validation errors before submitting.');
  
        return;
      }
      
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('skills', JSON.stringify(skls)); // Convert to JSON if sending as array

    if (image) {
      formData.append('image', image);
    }

    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}api/users/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Update user in local storage and context
      if (dispatch) {
        localStorage.setItem('user', JSON.stringify(data));
        dispatch({ type: 'LOGIN', payload: data });
      }

      // Update the preview with the new uploaded image from server response
      setPreview(`${process.env.REACT_APP_API_URL}profile/${data.user.image}`);
      navigate('/profile');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'An unexpected error occurred');
      } else {
        setError('Error updating profile. Please try again.');
      }
      console.error(error);
    }
  };

  const validatePhone = (value) => {
    const phoneRegex = /^[0-9]{10}$/; // Validate exactly 10 digits
    if (!phoneRegex.test(value)) {
      setErrorp('Phone number must be exactly 10 digits.');
    } else {
      setErrorp('');
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
    if (!emailRegex.test(value)) {
      setErrore('Please enter a valid email address.');
    } else {
      setErrore('');
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    validatePhone(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  return (
    <div className="row justify-content-md-center">
      <div className="col-md-6">
        <h2>Update Profile</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

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

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="number"
              className={`form-control ${errorp ? 'is-invalid' : ''}`} // Add Bootstrap's is-invalid class for error styling
              value={phone}
              onChange={handlePhoneChange}
              required
            />
            {errorp && <div className="invalid-feedback">{errorp}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Skills</label>
            <select
              className="form-control"
              name="skills"
              multiple
              onChange={handleSkillsChange}
              value={skls}
              required
            >
              {skillss.map((skill) => (
                <option key={skill._id} value={skill._id}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errore ? 'is-invalid' : ''}`}
              value={email}
              onChange={handleEmailChange}
            />
            {errore && <div className="invalid-feedback">{errore}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Profile Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          {preview && (
            <div className="mb-3">
              <img
                src={preview}
                alt="Profile Preview"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary" disabled={errorp || errore}>
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
