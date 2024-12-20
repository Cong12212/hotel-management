import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

   
      toast.success('Login successful!', { autoClose: 2000 });
      setTimeout(() => navigate('/'), 2000); // Chuyển hướng sau khi hiển thị toast
     
    
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h3 className="text-2xl font-semibold text-purple-600 text-center mb-4">HotelAir</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="form-control block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@hotelair.com"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 flex justify-between items-center">
              Password
              <a
                href="/forgot-password"
                className="text-purple-500 text-sm hover:underline"
              >
                Forgot Password?
              </a>
            </label>
            <input
              type="password"
              className="form-control block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="form-check-input h-4 w-4 border-gray-300 rounded text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
              Remember this Device
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            SIGN IN
          </button>
        </form>
        <div className="text-center my-4">
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg flex justify-center items-center">
            <i className="bi bi-google mr-2"></i> Sign in with Google
          </button>
        </div>
        <div className="text-center text-sm">
          <span>New to HotelAir? </span>
          <a
            href="/signup"
            className="text-purple-600 hover:underline"
          >
            Sign up here
          </a>
        </div>
        <div className="text-center text-gray-500 text-xs mt-4">
          © 2024 <span className="text-purple-600 font-semibold">HotelAir</span>, All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
