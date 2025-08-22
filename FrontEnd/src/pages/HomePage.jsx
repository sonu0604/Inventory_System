// src/pages/HomePage.js
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Features from "../components/Features";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <About />
      <Features />
      <Contact />
      <Footer />
    </>
  );
}

export default HomePage;
