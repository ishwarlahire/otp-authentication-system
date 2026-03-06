import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyOTP, sendOTP } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const { pendingAuth, login } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef([]);

  // Redirect if no pending auth
  useEffect(() => {
    if (!pendingAuth.identifier) {
      navigate('/login');
    }
  }, [pendingAuth, navigate]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split('').forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOTP(pendingAuth.identifier, otpString);
      login(response.accessToken, pendingAuth.identifier);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid OTP. Please try again.';
      toast.error(message);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await sendOTP(pendingAuth.identifier, pendingAuth.type);
      toast.success('OTP resent successfully!');
      setCountdown(60); // 60 second cooldown
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to resend OTP. Please try again.';
      toast.error(message);
    } finally {
      setResending(false);
    }
  };

  const getTypeIcon = () => {
    switch (pendingAuth.type) {
      case 'email':
        return 'bi-envelope';
      case 'whatsapp':
        return 'bi-whatsapp';
      case 'sms':
        return 'bi-phone';
      default:
        return 'bi-key';
    }
  };

  const getTypeLabel = () => {
    switch (pendingAuth.type) {
      case 'email':
        return 'Email';
      case 'whatsapp':
        return 'WhatsApp';
      case 'sms':
        return 'SMS';
      default:
        return 'OTP';
    }
  };

  return (
    <div className="verify-otp-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div className="bg-success bg-opacity-10 text-success rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-shield-lock fs-1"></i>
                  </div>
                  <h3 className="fw-bold">Verify OTP</h3>
                  <p className="text-muted mb-2">
                    Enter the 6-digit code sent via {getTypeLabel()}
                  </p>
                  <div className="d-inline-flex align-items-center bg-light rounded-pill px-3 py-2">
                    <i className={`bi ${getTypeIcon()} me-2 text-primary`}></i>
                    <span className="text-dark fw-medium">{pendingAuth.identifier}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* OTP Input */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-center d-block">Enter OTP</label>
                    <div className="d-flex justify-content-center gap-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength="1"
                          className="form-control form-control-lg text-center otp-input"
                          style={{ width: '50px', height: '60px', fontSize: '1.5rem', fontWeight: 'bold' }}
                          value={digit}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={handlePaste}
                          disabled={loading}
                          autoFocus={index === 0}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-success btn-lg w-100 mb-3"
                    disabled={loading || otp.join('').length !== 6}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify OTP
                        <i className="bi bi-check-circle ms-2"></i>
                      </>
                    )}
                  </button>

                  {/* Resend OTP */}
                  <div className="text-center">
                    <p className="text-muted mb-2">
                      Didn't receive the code?
                    </p>
                    {countdown > 0 ? (
                      <span className="text-muted">
                        Resend in <strong>{countdown}s</strong>
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-link text-primary p-0"
                        onClick={handleResend}
                        disabled={resending}
                      >
                        {resending ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Resending...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-arrow-clockwise me-1"></i>
                            Resend OTP
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>

                {/* Back to Login */}
                <hr className="my-4" />
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/login')}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
