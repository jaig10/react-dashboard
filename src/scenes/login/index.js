import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

const Login = ({ updateUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectTo, setRedirectTo] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('login-form, email: ' + email);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        email,
        password
      })
      .then(response => {
        console.log('login response: ');
        console.log(response);
        if (response.status === 200) {
        //   updateUser({
        //     loggedIn: true,
        //     email: response.data.email
        //   });
          setRedirectTo('/');
          navigate("/")
        }
      })
      .catch(error => {
        console.log('login error: ');
        console.log(error);
      });
  };

  if (redirectTo) {
    return <Link to={{ pathname: redirectTo }} />;
  } else {
    return (
      <div>
        <h4>Login</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
};

export default Login;
