import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendOTP } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setPendingAuthData } = useAuth();
  
  const [formData, setFormData] = useState({
    identifier: '',
    type: 'email',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const { identifier, type } = formData;

    if (!identifier.trim()) {
      newErrors.identifier = 'This field is required';
    } else if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        newErrors.identifier = 'Please enter a valid email address';
      }
    } else {
      // Phone validation for SMS/WhatsApp
      const phoneRegex = /^\+?[1-9]\d{9,14}$/;
      if (!phoneRegex.test(identifier.replace(/\s/g, ''))) {
        newErrors.identifier = 'Please enter a valid phone number (e.g., +919876543210)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await sendOTP(formData.identifier, formData.type);
      setPendingAuthData(formData.identifier, formData.type);
      toast.success('OTP sent successfully!');
      navigate('/verify-otp');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send OTP. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    switch (formData.type) {
      case 'email':
        return 'Enter your email address';
      case 'sms':
      case 'whatsapp':
        return 'Enter phone number (e.g., +919876543210)';
      default:
        return 'Enter your identifier';
    }
  };

  const getInputType = () => {
    return formData.type === 'email' ? 'email' : 'tel';
  };

  return (
    <div className="login-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-person-lock fs-1"></i>
                  </div>
                  <h3 className="fw-bold">Login</h3>
                  <p className="text-muted">Enter your details to receive OTP</p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* OTP Type Selection */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Verification Method</label>
                    <div className="btn-group w-100" role="group" aria-label="OTP type selection">
                      <input
                        type="radio"
                        className="btn-check"
                        name="type"
                        id="typeEmail"
                        value="email"
                        checked={formData.type === 'email'}
                        onChange={handleChange}
                      />
                      <label className="btn btn-outline-primary" htmlFor="typeEmail">
                        <i className="bi bi-envelope me-2"></i>
                        Email
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="type"
                        id="typeSms"
                        value="sms"
                        checked={formData.type === 'sms'}
                        onChange={handleChange}
                      />
                      <label className="btn btn-outline-primary" htmlFor="typeSms">
                        <i className="bi bi-phone me-2"></i>
                        SMS
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="type"
                        id="typeWhatsapp"
                        value="whatsapp"
                        checked={formData.type === 'whatsapp'}
                        onChange={handleChange}
                      />
                      <label className="btn btn-outline-primary" htmlFor="typeWhatsapp">
                        <i className="bi bi-whatsapp me-2"></i>
                        WhatsApp
                      </label>
                    </div>
                  </div>

                  {/* Identifier Input */}
                  <div className="mb-4">
                    <label htmlFor="identifier" className="form-label fw-semibold">
                      {formData.type === 'email' ? 'Email Address' : 'Phone Number'}
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className={`bi ${formData.type === 'email' ? 'bi-envelope' : 'bi-telephone'}`}></i>
                      </span>
                      <input
                        type={getInputType()}
                        className={`form-control form-control-lg ${errors.identifier ? 'is-invalid' : ''}`}
                        id="identifier"
                        name="identifier"
                        placeholder={getPlaceholder()}
                        value={formData.identifier}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      {errors.identifier && (
                        <div className="invalid-feedback">{errors.identifier}</div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Send OTP
                        <i className="bi bi-arrow-right ms-2"></i>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <small className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    OTP is valid for 5 minutes
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
