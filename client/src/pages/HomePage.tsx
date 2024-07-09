import React, { useState } from 'react';
import { useGetUserQuery } from '../services/api';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { data: user, error, isLoading } = useGetUserQuery();
  const [showRegister, setShowRegister] = useState(false);

  const renderAuthButtons = () => (
    <div className="space-y-4 mt-4">
      <Link to="/login" className="block w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center">
        Login
      </Link>
      {showRegister ? (
        <Link to="/register" className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
          Register
        </Link>
      ) : (
        <button 
          onClick={() => setShowRegister(true)} 
          className="block w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded text-center"
        >
          New to FLearn? Create an account
        </button>
      )}
    </div>
  );

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
            {renderAuthButtons()}
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
            <p className="text-xl mb-4">Welcome to FLearn! Please log in to start your learning journey.</p>
            {renderAuthButtons()}
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