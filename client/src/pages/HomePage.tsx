import React from 'react';
import { useGetUserQuery } from '../services/api';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { data: user, error, isLoading } = useGetUserQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Error fetching user:', error);
    return <div>Error: Unable to fetch user data</div>;
  }

  return (
    <div>
      <h1>Welcome to FLearn</h1>
      {user ? (
        <div>
          <p>Hello, {user.username}!</p>
          <Link to="/decks">View Your Decks</Link>
        </div>
      ) : (
        <div>
          <p>Please log in or register to start learning.</p>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;