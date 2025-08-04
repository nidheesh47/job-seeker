import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/user/logout");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome Home! 🎉
        </h1>
        <p className="text-gray-600 mb-6">You are successfully logged in.</p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
