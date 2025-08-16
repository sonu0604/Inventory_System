// src/pages/HomePage.js
import React from "react";
import Navbar from "../Components/Navbar";
import HeroSection from "../Components/HeroSection";
import About from "../Components/About";
import Features from "../Components/Features";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";

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
