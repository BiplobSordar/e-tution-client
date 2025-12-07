import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import { FiHome } from "react-icons/fi"; 

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-[var(--primary)] mb-4">404</h1>
      <p className="text-xl text-[var(--text-secondary)] mb-6">
        Oops! Page not found.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 btn-secondary px-4 py-2 hover:bg-gray-200 transition"
        >
          <LuArrowLeft size={18} /> Go Back
        </button>

        <Link
          to="/"
          className="flex items-center gap-2 btn-primary px-4 py-2 hover:bg-blue-700 transition"
        >
          <FiHome size={18} /> Go Home
        </Link>
      </div>

      <div className="mt-8 text-[var(--text-secondary)] text-sm sm:text-base">
        If you think this is an error, contact support.
      </div>
    </div>
  );
};

export default NotFound;
