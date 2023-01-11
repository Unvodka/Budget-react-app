import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login-register.css';

const Login = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeInput = (e) => {
    const { name, email, password, value } = e.target;
    setUser({ ...user, [name]: value, [email]: value, [password]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3005/user/login', user);
      // await axios.post('https://polar-retreat-98644.herokuapp.com/user/login', user)

      localStorage.setItem('firstLogin', true);
      localStorage.setItem('accessToken', res.data.accesstoken);
      localStorage.setItem('user-info', user.email);
      localStorage.setItem('user-name', user.name);
      sessionStorage.setItem('activeSession', 'true');

      window.location.href = '/envelopes';
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={loginSubmit}>
      <fieldset className="login">
        <legend>Login or Register</legend>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={onChangeInput}
            className="form-control"
            aria-describedby="name"
            placeholder="Enter your name"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={onChangeInput}
            className="form-control"
            aria-describedby="email"
            placeholder="Enter email"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="true"
            value={user.password}
            onChange={onChangeInput}
            className="form-control"
            placeholder="Password"
          ></input>
        </div>
        <button className="btn-login" type="submit">
          Login
        </button>
        <Link to="/register">REGISTER</Link>
      </fieldset>
    </form>
  );
};
export default Login;
