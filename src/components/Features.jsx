import React from 'react';
import '../styles/Features.css';

const Features = () => {
  return (
    <div className="features-section">
      <h3>How Myopique Works</h3>
      <div className="features">
        <div className="feature-card">
          <h4>Precision AI</h4>
          <p>Analyzes eye data with 95% accuracy</p>
        </div>
        <div className="feature-card">
          <h4>Early Warning</h4>
          <p>Detects myopia before it progresses</p>
        </div>
        <div className="feature-card">
          <h4>User-Friendly</h4>
          <p>Accessible via any smartphone</p>
        </div>
      </div>
    </div>
  );
};

export default Features;