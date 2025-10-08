import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, User } from "lucide-react";

import { backendUrl } from "../API/BackendUrl";
import { toast } from "react-toastify";
import axios from "axios";
const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${backendUrl}/users/RegisterUser`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "user registered successfully!");
        navigate("/login"); // Navigate to the dashboard or target page
      }

      if (response.status === 409) {
        toast.error("user with Email. already exists");
      }
      if (response.status === 500) {
        const errorMessage =
          response.data.message || "Authentication failed. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      console.error("Caught error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to authenticate. Please try again.";
      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-gray-600">
            Join the movement for a better city.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a Password"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-102"
          >
            <UserPlus className="w-5 h-5" />
            <span>Sign Up</span>
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
