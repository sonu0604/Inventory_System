import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 80; // offset for navbar height
        if (window.scrollY >= sectionTop) {
          currentSection = section.getAttribute("id");
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold text-warning" href="#home">
          Inventory<span className="text-white">MS</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a
                className={`nav-link ${activeSection === "home" ? "active" : ""}`}
                href="#home"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeSection === "about" ? "active" : ""}`}
                href="#about"
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeSection === "features" ? "active" : ""}`}
                href="#features"
              >
                Features
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
                href="#contact"
              >
                Contact
              </a>
            </li>
          </ul>

          <div className="d-flex">
            <a href="/login" className="btn btn-outline-light me-2">
              Login
            </a>
            <a href="/register" className="btn btn-warning fw-semibold">
              Register
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
