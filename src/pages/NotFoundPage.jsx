import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-blue-600 mb-4 drop-shadow-lg">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Oops! The page you are looking for does not exist or has been moved.<br />
          Please check the URL or return to the homepage.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-200 text-lg"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage; 