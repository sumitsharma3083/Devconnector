import React, { Fragment, useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {SET_ALERT , REMOVE_ALERT} from '../../store/slices/types'
import {setAlert} from '../../store/slices/alertSlice'
import { register, loadUser } from '../../store/slices/authSlice'
import { v4 as uuidv4 } from 'uuid';

const Register = () => {
  const dispatch = useDispatch(); 
  const isAuthenticated = useSelector(state.auth.isAuthenticated)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
     e.preventDefault();

     if (password !== password2) {
      const id = uuidv4();
      dispatch(setAlert(SET_ALERT , {msg  : "Passwords do not match", type : "danger" , id}))
      setTimeout(() => dispatch(setAlert(REMOVE_ALERT , {id})) ,5000);
     } else {
      dispatch(register({ name, email, password }))
      dispatch(loadUser())
     }
  };

  if (isAuthenticated) {
    redirect("/dashboard")
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

 

 

export default Register;
