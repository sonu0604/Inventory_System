// src/HomePage.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function HomePage() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            InventoryMS
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
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>
            <div>
              <button className="btn btn-outline-light me-2">Login</button>
              <button className="btn btn-warning">Sign Up</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-light py-5 text-center">
        <div className="container">
          <h1 className="fw-bold">Welcome to Inventory Management System</h1>
          <p className="lead mt-3">
            Manage your products, suppliers, consumers, purchases, and sales
            with ease. Secure and role-based access for admins and staff.
          </p>
          <button className="btn btn-primary btn-lg mt-3">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Key Features</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">Admin Dashboard</h5>
                  <p className="card-text">
                    Add, update, and delete products, suppliers, and consumers.
                    Generate detailed reports and manage the entire inventory.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">Staff Dashboard</h5>
                  <p className="card-text">
                    Perform purchase and sale transactions, and generate
                    relevant reports with limited permissions.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">Reports & Insights</h5>
                  <p className="card-text">
                    Generate and download purchase/sales reports to analyze
                    performance and track stock levels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light py-3">
        <div className="container text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} InventoryMS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
