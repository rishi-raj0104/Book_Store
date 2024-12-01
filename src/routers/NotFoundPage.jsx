import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-cover bg-gray-100 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center animate__animated animate__fadeInUp">
        <div className="flex justify-center mb-6">
          <FaExclamationTriangle className="text-6xl text-red-500 animate__animated animate__bounce" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-6">Sorry, the page you're looking for doesn't exist.</p>
        <button
          className="bg-black text-white px-6 py-3 rounded-md text-lg transition-colors hover:bg-slate-800"
          onClick={() => window.location.href = '/'}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
