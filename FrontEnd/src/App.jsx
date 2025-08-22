// src/App.jsx
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Features from "./components/Features";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

// Single dashboard
import AdminDashboard from "./dashboards/admin/AdminDashboard";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        {/* Public Website */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HeroSection />
              <About />
              <Features />
              <Contact />
              <Footer />
            </>
          }
        />

        {/* Login & Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            user?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
