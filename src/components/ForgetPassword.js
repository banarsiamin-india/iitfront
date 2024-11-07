// src/components/ForgetPassword.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Button from 'react-bootstrap/Button';
import { Link} from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const { forgetPwd, error } = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    forgetPwd(email);
    // alert('Password reset link sent to your email');

  };


  return (
    <div className="row justify-content-md-center">
      <div className="col-md-6">
        <h2>Forget Password</h2>
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}

        <form onSubmit={submitHandler}>   
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          
          <Button type="submit" variant="primary">Forget Password</Button>
          <Button variant="link"> <Link to="/login">login here</Link></Button>

        </form>
      </div>
    </div>
  );

};

export default ForgetPassword;
