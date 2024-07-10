import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../redux/api';
import { setToken, setUser } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');

  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateInputs = (input) => {
    return input.trim().length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs(email) || !validateInputs(password) || !validateInputs(username)) {
      alert("You must enter email, username, and password");
      return;
    }

    try {
      const result = await register({ 
        email, 
        username, 
        password,
        firstName,
        lastName,
        avatar,
        bio
      }).unwrap();

      if (result.token) {
        dispatch(setToken(result.token));
        dispatch(setUser(result.user));
        navigate('/');
      }
    } catch (err) {
      console.error('Failed to register:', err);
      console.log("Detailed error:", err.response?.data || err.message);
    }
  };

  return (
    <div className='registration-form'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="avatar">Avatar URL</label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && (
        <p style={{ color: 'red' }}>
          Registration Failed: {error.data?.message || "Please Try Again"}
        </p>
      )}
    </div>
  );
}

export default RegisterPage;