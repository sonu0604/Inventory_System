import React, { useState } from "react";
import axios from "axios";
import "./Registration.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "staff", // default role
    contact: "",
    name: "",
    picture: ""
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3000/register", formData);
      setMessage(res.data.message);
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "staff",
        contact: "",
        name: "",
        picture: ""
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="register-section d-flex align-items-center justify-content-center">
      <div className="overlay"></div>
      <div className="container position-relative z-2">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg p-4">
              <h3 className="text-center mb-4 text-warning fw-bold">Register</h3>
              <form onSubmit={handleSubmit}>
                
                {/* Username */}
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-muted">
                    Must be at least 6 characters, include a digit & special character.
                  </small>
                </div>

                {/* Contact */}
                <div className="mb-3">
                  <label className="form-label">Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </div>

                {/* Role */}
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* Profile Picture URL */}
                <div className="mb-3">
                  <label className="form-label">Profile Picture URL</label>
                  <input
                    type="text"
                    className="form-control"
                    name="picture"
                    value={formData.picture}
                    onChange={handleChange}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-warning w-100 fw-semibold"
                >
                  Register
                </button>
              </form>

              {/* Show message */}
              {message && (
                <div className="alert alert-info mt-3 text-center">{message}</div>
              )}

              <p className="mt-3 text-center">
                Already have an account?{" "}
                <a href="/login" className="text-warning fw-bold">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
