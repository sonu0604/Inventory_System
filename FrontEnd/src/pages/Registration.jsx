import React, { useState } from "react";
import axios from "axios";
import "./Registration.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "staff",
    contact: "",
    name: "",
  });
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  // Handle text input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    if (picture) {
      data.append("picture", picture);
    }

    try {
      const res = await axios.post("http://localhost:3000/register", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage(res.data.message);
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "staff",
        contact: "",
        name: "",
      });
      setPicture(null);
      setPreview(null);
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
                <input type="text" className="form-control mb-3" placeholder="Username"
                  name="username" value={formData.username} onChange={handleChange} required />

                {/* Full Name */}
                <input type="text" className="form-control mb-3" placeholder="Full Name"
                  name="name" value={formData.name} onChange={handleChange} required />

                {/* Email */}
                <input type="email" className="form-control mb-3" placeholder="Email"
                  name="email" value={formData.email} onChange={handleChange} required />

                {/* Password */}
                <input type="password" className="form-control mb-3" placeholder="Password"
                  name="password" value={formData.password} onChange={handleChange} required />

                {/* Contact */}
                <input type="text" className="form-control mb-3" placeholder="Contact"
                  name="contact" value={formData.contact} onChange={handleChange} />

                {/* Role */}
                <select className="form-select mb-3" name="role"
                  value={formData.role} onChange={handleChange}>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>

                {/* Picture */}
                <input type="file" className="form-control mb-3"
                  accept="image/*" onChange={handleFileChange} />

                {/* Preview */}
                {preview && (
                  <div className="text-center mb-3">
                    <img src={preview} alt="preview" className="img-fluid rounded" style={{maxHeight:"150px"}} />
                  </div>
                )}

                {/* Submit */}
                <button type="submit" className="btn btn-warning w-100 fw-semibold">
                  Register
                </button>
              </form>

              {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
