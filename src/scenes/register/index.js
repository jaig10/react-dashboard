import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';


const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectTo, setRedirectTo] = useState(null);
  const navigate = useNavigate();
  console.log(process.env.REACT_APP_BACKEND_URL);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('sign-up-form, email: ' + email);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/register`, {
      firstName,
      lastName,
      username,
      email,
      password
    })
    .then(response => {
      console.log(response);
      if (response.data) {
        console.log('successful signup');
        setRedirectTo('/login');
        navigate("/login")
      } else {
        console.log('Sign-up error');
      }
    })
    .catch(error => {
      console.log('Sign up server error: ');
      console.log(error);
    });
  };

  if (redirectTo) {
    return <Link to={{ pathname: redirectTo }} />;
  } else {
    return (
      <div>
        <h4>Sign Up</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
};

export default Register;
