import React from 'react';
import { clearToken, clearUser } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../redux/api'; // Make sure this import is correct

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation(); // Use the logout mutation from your API slice

  const handleLogout = async () => {
    try {
      await logout().unwrap(); // Call the logout mutation
      dispatch(clearToken());
      dispatch(clearUser());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;