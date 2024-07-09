import React from 'react';
import { useGetUserQuery } from '../services/api';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { data: user, error, isLoading } = useGetUserQuery();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">FLearn</h1>
        <p className="text-xl text-gray-600">Flash Cards for Effective Learning</p>
      </header>

      <main>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500">Error: Unable to fetch user data</p>
            <p className="mt-2">Please try again later or contact support if the problem persists.</p>
          </div>
        ) : user ? (
          <div className="text-center">
            <p className="text-2xl mb-4">Welcome back, {user.username}!</p>
            <Link to="/decks" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View Your Decks
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl mb-4">Start your learning journey today!</p>
            <div className="space-x-4">
              <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Login
              </Link>
              <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Register
              </Link>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-16 text-center text-gray-500">
        <p>&copy; 2024 FLearn. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;