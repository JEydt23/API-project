// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const demoUser = (event) => {
    setCredential('demo@user.io');
    setPassword('password')
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => setShowModal(false))
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };



  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <h2>Welcome to Air-bee-en-bee</h2>
      <div className="input-fields">
        <label >
          {/* Username or Email */}
          <input id='input-box-username'
            type="text"
            value={credential}
            placeholder="Username or email"
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label >
          {/* Password */}
          <input id='input-box-password'
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit" id='loginButton'>Log In</button>
      <div className="demo-user-login">
      <button id="submit-button" onClick={demoUser}>DemoUser Login</button>
      </div>

    </form>
  );
}

export default LoginForm;
