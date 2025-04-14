import React from 'react';
import Navbar from './Navbar';
import HeroSection from './Hero';
import Features from './Features';
import Footer from './Footer';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <div className="main-content">
        <HeroSection />
        <Features />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;