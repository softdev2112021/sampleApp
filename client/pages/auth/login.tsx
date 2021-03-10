import React, { useState, useEffect } from 'react';
import { postData } from '../../lib/services/services';
import Cache from '../../lib/cache/Cache';

const cache = new Cache();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      login: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    }

    const res = await postData('http://localhost:4000/auth/login', JSON.stringify(data));

    cache.write('token', await res.json());

    if (res.ok) {
      location.href = '/locations';
    } else {
      alert('Failed to login!');
    }
  }
  
  return (
    <>
      <div className="login-cover">
        <div
          className="login-cover-image"
          style={{ backgroundImage: "url(/assets/img/login-bg/login-bg-17.jpg)" }}
        ></div>
        <div className="login-cover-bg"></div>
      </div>

      <div className="login login-v2">
        <div className="login-header">
          <div className="brand">
            <span className="logo"><i className="fas fa-cloud"></i></span> <b>Forecastic</b> App
            <small>Weather forecast by Ivan</small>
          </div>
          <div className="icon">
            <i className="fa fa-lock"></i>
          </div>
        </div>
        <div className="login-content">
          <form className="margin-bottom-0" onSubmit={onSubmit}>
            <div className="form-group m-b-20">
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChangeEmail}
                className="form-control form-control-lg"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="form-group m-b-20">
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                className="form-control form-control-lg"
                placeholder="Password"
                required
              />
            </div>
            <div className="login-buttons">
              <button
                type="submit"
                className="btn btn-success btn-block btn-lg"
              >
                Sign me in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;