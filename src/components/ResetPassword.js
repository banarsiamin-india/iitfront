import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Link} from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;
const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}api/users/reset-password`, {
        token,
        password,
      });
      console.log('reset password',response);
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      setMessage(error.response.data.message || 'Error resetting password');
    }
  };

  return (
    <>
    <div className="row justify-content-md-center">
        <div className="col-md-6">
            <h2>Reset Password</h2>
            {message && <p style={{color:'red'}} >{message}</p>}
            <form onSubmit={handleResetPassword}>
                <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
          
{/* <div>
<label>New Password</label>
<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
</div>
<div>
<label>Confirm New Password</label>
<input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
</div> */}
                {/* <button type="submit">Reset Password</button> */}
                <Button type="submit" variant="primary">Reset Password</Button>
                <Button variant="link"> <Link to="/login">login here</Link></Button>
            </form>
        </div>
    </div>

    </>
  );
};

export default ResetPassword;
