import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Giả lập kiểm tra thông tin đăng nhập
    if (email === 'admin@hotelair.com' && password === '12345678') {
      localStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập
      navigate('/'); // Chuyển hướng đến trang Dashboard (trang gốc)
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
        <h3 className="text-center text-danger mb-4">HotelAir</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@hotelair.com"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label d-flex justify-content-between">
              Password
              <a href="/forgot-password" className="text-decoration-none" style={{ fontSize: '0.9rem', color: '#5E3B8C' }}>
                Forgot Password?
              </a>
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember this Device
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ backgroundColor: '#5E3B8C', borderColor: '#5E3B8C' }}
          >
            SIGN IN
          </button>
        </form>

        <div className="mt-3 text-center">
          <button className="btn btn-secondary w-100" style={{ backgroundColor: '#6c757d' }}>
            <i className="bi bi-google"></i> Sign in with Google
          </button>
        </div>

        <div className="text-center mt-3">
          <small>
            New to HotelAir?{' '}
            <a href="/signup" className="text-decoration-none text-danger">
              Sign up here
            </a>
          </small>
        </div>
        <div className="text-center mt-4 text-muted" style={{ fontSize: '0.85rem' }}>
          © 2024 <span className="text-danger">HotelAir</span>, All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
