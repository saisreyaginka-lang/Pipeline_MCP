import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import validation from './LoginValidation';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';

function Login() {
  const [values, setValues] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (validationErrors.email === "" && validationErrors.password === "") {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.data.status === "Success") {
            // Save user info in Redux
            dispatch(loginSuccess(res.data.user));
            // Redirect to Home
            navigate('/home');
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign-In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label><strong>Password</strong></label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">Log in</button>
          <p className="text-center mt-2">You agree to your terms and policies</p>
          <Link to="/signup" className="btn btn-light border w-100 rounded-0 text-decoration-none">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
