import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-page py-5">
      <div className="container">
        {/* Welcome Header */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="card border-0 shadow-sm bg-primary text-white">
              <div className="card-body p-5">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h2 className="fw-bold mb-3">
                      <i className="bi bi-emoji-smile me-3"></i>
                      Welcome Back!
                    </h2>
                    <p className="lead mb-0 opacity-75">
                      You are logged in as <strong>{user?.identifier}</strong>
                    </p>
                  </div>
                  <div className="col-md-4 text-md-end mt-3 mt-md-0">
                    <button
                      className="btn btn-outline-light btn-lg"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="row g-4">
          {/* Profile Card */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3">
                    <i className="bi bi-person-circle fs-3"></i>
                  </div>
                  <div>
                    <h5 className="card-title fw-bold mb-0">Profile</h5>
                    <small className="text-muted">Your account details</small>
                  </div>
                </div>
                <div className="bg-light rounded p-3">
                  <div className="mb-2">
                    <small className="text-muted d-block">Identifier</small>
                    <span className="fw-medium">{user?.identifier}</span>
                  </div>
                  <div>
                    <small className="text-muted d-block">Status</small>
                    <span className="badge bg-success">
                      <i className="bi bi-check-circle me-1"></i>
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-success bg-opacity-10 text-success rounded-circle p-3 me-3">
                    <i className="bi bi-shield-check fs-3"></i>
                  </div>
                  <div>
                    <h5 className="card-title fw-bold mb-0">Security</h5>
                    <small className="text-muted">Authentication status</small>
                  </div>
                </div>
                <ul className="list-unstyled mb-0">
                  <li className="mb-3 d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-3"></i>
                    <span>OTP Verified</span>
                  </li>
                  <li className="mb-3 d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-3"></i>
                    <span>JWT Token Active</span>
                  </li>
                  <li className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-3"></i>
                    <span>Session Secure</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-info bg-opacity-10 text-info rounded-circle p-3 me-3">
                    <i className="bi bi-lightning-charge fs-3"></i>
                  </div>
                  <div>
                    <h5 className="card-title fw-bold mb-0">Quick Actions</h5>
                    <small className="text-muted">Common tasks</small>
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-outline-primary text-start">
                    <i className="bi bi-gear me-2"></i>
                    Settings
                  </button>
                  <button className="btn btn-outline-primary text-start">
                    <i className="bi bi-question-circle me-2"></i>
                    Help & Support
                  </button>
                  <button 
                    className="btn btn-outline-danger text-start"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card border-0 shadow-sm bg-light">
              <div className="card-body p-4">
                <div className="row align-items-center">
                  <div className="col-md-1 text-center mb-3 mb-md-0">
                    <i className="bi bi-info-circle fs-1 text-primary"></i>
                  </div>
                  <div className="col-md-11">
                    <h5 className="fw-bold mb-2">Authentication Info</h5>
                    <p className="text-muted mb-0">
                      You are securely authenticated using OTP verification. Your session is protected 
                      with JWT tokens. For security reasons, you will be automatically logged out after 
                      a period of inactivity. Always logout when using shared devices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
