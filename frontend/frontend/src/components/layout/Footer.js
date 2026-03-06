import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 className="fw-bold">
              <i className="bi bi-shield-lock me-2"></i>
              Ishwar Lahire Services
            </h5>
            <p className="text-muted mb-0">
              Secure OTP Authentication System
            </p>
          </div>
          <div className="col-md-6 text-md-end mt-3 mt-md-0">
            <div className="mb-2">
              <a href="#!" className="text-light me-3" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#!" className="text-light me-3" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#!" className="text-light me-3" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#!" className="text-light" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
            <p className="text-muted mb-0">
              &copy; {currentYear} Ishwar Lahire Services. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
