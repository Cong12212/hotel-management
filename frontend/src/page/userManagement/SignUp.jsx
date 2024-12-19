import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!isChecked) {
      alert("Please accept the Terms and Conditions.");
      return;
    }

    // Thực hiện logic đăng ký (giả lập)
    console.log('User Registered:', { firstName, lastName, email, password });
    alert('Account created successfully!');
    navigate('/login'); // Chuyển về trang đăng nhập sau khi đăng ký thành công
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
        <h3 className="text-center text-danger mb-4">HotelAir</h3>
        <form onSubmit={handleSignup}>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="8"
                required
              />
            </div>
            <div className="col">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength="8"
                required
              />
            </div>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="terms">
              I accept the <a href="/terms" className="text-decoration-none">Terms and Conditions</a>
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ backgroundColor: '#5E3B8C', borderColor: '#5E3B8C' }}
          >
            SIGN UP
          </button>
        </form>

        <div className="mt-3 text-center">
          <button className="btn btn-secondary w-100" style={{ backgroundColor: '#6c757d' }}>
            <i className="bi bi-google"></i> Sign up with Google
          </button>
        </div>

        <div className="text-center mt-3">
          <small>
            Already have an account?{' '}
            <a href="/login" className="text-decoration-none text-danger">
              Sign in here
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

export default Signup;
