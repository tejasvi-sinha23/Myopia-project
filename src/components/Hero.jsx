import React from 'react';
import '../styles/HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <h1>AI-Powered Myopia Detection</h1>
      <p className="description">
        Myopique leverages cutting-edge AI to detect undiagnosed myopia, 
        bringing clarity to millions worldwide.
      </p>
      <div className="stats">
        <div className="stat-item">
          <h2>2.2B</h2>
          <p>People with vision impairment globally</p>
        </div>
        <div className="stat-item">
          <h2>1B</h2>
          <p>Undetected myopia cases</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;