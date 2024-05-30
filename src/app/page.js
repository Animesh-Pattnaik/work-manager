import React from 'react';

export const metadata = {
  title: "Home : Work Manager",
};

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Work Manager</h1>
          <p className="hero-subtitle">Your ultimate tool to manage work efficiently and effectively.</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>
      <section className="features">
        <div className="feature-card">
          <h2 className="feature-title">Task Management</h2>
          <p className="feature-description">Organize your tasks, set priorities, and track progress with ease.</p>
        </div>
        <div className="feature-card">
          <h2 className="feature-title">Collaboration</h2>
          <p className="feature-description">Work with your team in real-time and stay updated on the go.</p>
        </div>
        <div className="feature-card">
          <h2 className="feature-title">Analytics</h2>
          <p className="feature-description">Get detailed reports and insights to improve productivity.</p>
        </div>
      </section>
    </div>
  );
}
