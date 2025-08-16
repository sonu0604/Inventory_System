import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HeroSection.css"; // custom styles

function HeroSection() {
  return (
    <section id="home" className="hero-section position-relative text-white text-center d-flex align-items-center">
      {/* Background Video */}
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        src="\src\assets\herovideo.mp4" // replace with your own video link
        type="video/mp4"
      ></video>

      {/* Dark Overlay */}
      <div className="overlay"></div>

      {/* Hero Content */}
      <div className="container position-relative hero-content">
        <h1 className="fw-bold display-4">Inventory Management System</h1>
        <p className="lead mt-3 mb-4">
          Streamline your inventory, track suppliers & consumers, manage sales
          and purchases — all in one place.
        </p>
        <a href="/login" className="btn btn-warning btn-lg me-2">
          Get Started
        </a>
        <a href="/features" className="btn btn-outline-light btn-lg">
          Learn More
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
