import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { logIn } from '../../service/apiServices';
import { useAuth } from '../../hook/useAuth';

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { userLogin } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!username.trim()) {
      toast.error("Username cannot be empty!", { autoClose: 2000 });
      return;
    }
    if (!password.trim()) {
      toast.error("Password cannot be empty!", { autoClose: 2000 });
      return;
    }

    const result = await logIn({ username, password });
    localStorage.setItem('user', JSON.stringify(result.data));
    if (result.data) {
      toast.success('Login successful!', { autoClose: 2000 });
      userLogin(result.data); // Update user state
      setTimeout(() => {
        navigate('/dashboard'); // Redirect to dashboard or another page after a delay
      }, 1500); // Delay for 2 seconds (adjust if needed)
    } else {
      if (result.err.status === 401) {
        toast.error('Username or password is incorrect!', { autoClose: 2000 });
      } else {
        toast.error(result.error || 'Login failed!', { autoClose: 2000 });
      }
    }
  };


  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center font-dm-sans font-medium bg-gradient-to-r from-violet-300 to-pink-300 ">
      <ToastContainer />
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '400px' }}>
        <h3 className="text-center focus:outline-dashed focus:outline-2 focus:outline-violet-500 font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-pink-700 mb-3 font-bold">
          Welcome to HotelAir
        </h3>
        <form onSubmit={handleLogin}>
          {/* Ô nhập Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-transparent bg-clip-text bg-gradient-to-b from-violet-700 to-pink-700">Username <span style={{ color: 'red' }}>*</span></label>
            <FormControl
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              className="shadow-sm"
            />
          </div>

          {/* Ô nhập Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-transparent bg-clip-text bg-gradient-to-b from-violet-700 to-pink-700">Password <span style={{ color: 'red' }}>*</span></label>
            <InputGroup>
              <FormControl
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="shadow-sm"
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword((prev) => !prev)}
                className="border border-transparent outline-none hover:bg-gray-100 shadow-sm"
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} ${showPassword ? 'text-transparent bg-clip-text bg-gradient-to-b from-violet-700 to-pink-700' : 'text-transparent bg-clip-text bg-gradient-to-b from-violet-700 to-pink-700'}`}></i>
              </Button>
            </InputGroup>
            <a
              href="/forgot-password"
              className="d-block mt-2 text-end text-decoration-none small text-transparent bg-clip-text bg-gradient-to-b from-violet-700 to-pink-700"
            >
              Forgot Password?
            </a>
            {/* Checkbox Remember Me */}
          </div>
          {/* Nút SIGN IN */}
          <button
            type="submit"
            className="w-100 py-2 text-white font-semibold bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-700 hover:to-pink-700 rounded-md"
          >
            SIGN IN
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-3 small">
          <span>New to HotelAir? </span>
          <a href="/signup" className="text-decoration-none text-transparent bg-clip-text bg-gradient-to-b from-violet-700 to-pink-700">
            Sign up here
          </a>
        </div>
        <div className="text-center text-muted small mt-3 ">
          © 2024 <strong className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-pink-700">HotelAir</strong>. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;