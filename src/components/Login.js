// src/components/Login.js
import React, { useState, useContext,useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Button from 'react-bootstrap/Button';
import { Link,useNavigate} from 'react-router-dom';

const Login = () => {
  const { user, login, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="row justify-content-md-center">
      <div className="col-md-6">
        <h2>Login form!</h2>
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
        <form onSubmit={submitHandler}>   
          <div className="mb-3">
            <label className="form-label">Email *</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password *</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <Button type="submit" variant="primary">Login</Button>
          <Button variant="link"> <Link to="/forgetpassword">Forget Password</Link></Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
