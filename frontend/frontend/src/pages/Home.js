import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Secure OTP Authentication
              </h1>
              <p className="lead mb-4">
                Welcome to Ishwar Lahire Services. Experience seamless and secure 
                authentication via SMS, WhatsApp, or Email OTP verification.
              </p>
              {!isAuthenticated ? (
                <Link to="/login" className="btn btn-light btn-lg px-5">
                  Get Started
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              ) : (
                <Link to="/dashboard" className="btn btn-light btn-lg px-5">
                  Go to Dashboard
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              )}
            </div>
            <div className="col-lg-6 text-center mt-5 mt-lg-0">
              <div className="hero-icon">
                <i className="bi bi-shield-check" style={{ fontSize: '12rem', opacity: 0.2 }}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose Us?</h2>
            <p className="text-muted">Multiple ways to verify your identity securely</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="feature-icon bg-primary bg-opacity-10 text-primary rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-phone fs-1"></i>
                  </div>
                  <h5 className="card-title fw-bold">SMS OTP</h5>
                  <p className="card-text text-muted">
                    Receive a secure 6-digit OTP directly to your mobile phone via SMS.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="feature-icon bg-success bg-opacity-10 text-success rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-whatsapp fs-1"></i>
                  </div>
                  <h5 className="card-title fw-bold">WhatsApp OTP</h5>
                  <p className="card-text text-muted">
                    Get your OTP conveniently delivered via WhatsApp message.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="feature-icon bg-info bg-opacity-10 text-info rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-envelope fs-1"></i>
                  </div>
                  <h5 className="card-title fw-bold">Email OTP</h5>
                  <p className="card-text text-muted">
                    Prefer email? Receive your verification code in your inbox.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="security-section bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Enterprise-Grade Security</h2>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                  <span>OTP expires automatically after 5 minutes</span>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                  <span>Secure JWT token-based authentication</span>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                  <span>Redis-backed OTP storage for high performance</span>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                  <span>Multiple verification channels for flexibility</span>
                </li>
              </ul>
            </div>
            <div className="col-lg-6 text-center">
              <i className="bi bi-lock-fill text-primary" style={{ fontSize: '10rem', opacity: 0.3 }}></i>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Ready to Get Started?</h2>
          <p className="lead mb-4">
            Experience secure authentication in just a few clicks.
          </p>
          {!isAuthenticated && (
            <Link to="/login" className="btn btn-light btn-lg px-5">
              Login Now
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
