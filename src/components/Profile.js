import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import axios from 'axios';

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const [prodata, setProfile] = useState(null); // Initialize prodata as null

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [user, token]);

  return (
    <div className="row justify-content-md-center">
      <div className="col-md-6">
        <h2>User Profile</h2>
        {user?.user.image && (
          <img
            src={`${process.env.REACT_APP_API_URL}uploads/${user.user.image}`}
            alt="Profile"
            style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
          />
        )}
        <p>
          <strong>Name:</strong> {user?.user.name}{' '}
          <Badge pill bg="info" text="dark">
            {user?.user.roles.name}
          </Badge>
        </p>
        <p><strong>Phone:</strong> {user?.user.phone}</p>
        <p><strong>Email:</strong> {user?.user.email}</p>
        <p>
          <strong>Skills:</strong>{' '}
          {prodata?.skills && prodata.skills.length > 0 ? (
            prodata.skills.map((skill, index) => {
              const lastIndex = prodata.skills.length - 1;
              return (
                <span key={skill._id}>
                  <Badge pill bg="info" text="dark">
                    {skill.name}
                  </Badge>
                  {index === lastIndex - 1 && prodata.skills.length > 1 ? ' ' : index < lastIndex ? '  ' : ''}
                </span>
              );
            })
          ) : (
            'No skills'
          )}
        </p>
        <Link className="btn btn-outline-primary me-2" to="/profile/update">Edit</Link>
      </div>
    </div>
  );
};

export default Profile;
