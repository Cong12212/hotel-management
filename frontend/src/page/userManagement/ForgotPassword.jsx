import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset password email sent to:", email);
    // Logic gửi yêu cầu reset password sẽ được thêm ở đây
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="card p-4 shadow" style={{ width: "400px", borderRadius: "8px" }}>
        <div className="text-center mb-4">
          <h1 style={{ color: "#d63384" }}>
            <strong>HotelAir</strong>
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <small className="text-muted">
              An email will be sent to the above address with a link to set your new password.
            </small>
          </div>
          <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: "#5f3dc4", border: "none" }}>
            SUBMIT
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="/signin" style={{ color: "#d63384", textDecoration: "none" }}>
            Back to Sign in
          </a>
        </div>
        <div className="text-center mt-3 text-muted" style={{ fontSize: "12px" }}>
          © 2024 <span style={{ color: "#d63384" }}>HotelAir</span>, All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;