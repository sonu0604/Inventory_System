import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      // Save JWT + user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        setMessage(`Welcome Staff, ${res.data.user.username}! (staff dashboard coming soon)`);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="login-section d-flex align-items-center justify-content-center">
      <div className="overlay"></div>
      <div className="container position-relative z-2">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-lg p-4">
              <h3 className="text-center mb-4 text-warning fw-bold">Login</h3>
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-warning w-100 fw-semibold"
                >
                  Login
                </button>
              </form>

              {/* Show Message */}
              {message && (
                <div className="alert alert-info mt-3 text-center">{message}</div>
              )}

              {/* Optional: Register Link */}
              <p className="mt-3 text-center">
                Don’t have an account?{" "}
                <a href="/register" className="text-warning fw-bold">
                  Register
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

