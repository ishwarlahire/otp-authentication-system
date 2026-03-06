/**
 * Application Constants
 */

// API Endpoints
export const API_ENDPOINTS = {
  SEND_OTP: '/auth/send-otp',
  VERIFY_OTP: '/auth/verify-otp',
};

// OTP Configuration
export const OTP_CONFIG = {
  LENGTH: 6,
  EXPIRY_SECONDS: 300, // 5 minutes
  RESEND_COOLDOWN_SECONDS: 60,
};

// Verification Types
export const VERIFICATION_TYPES = {
  EMAIL: 'email',
  SMS: 'sms',
  WHATSAPP: 'whatsapp',
};

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number (e.g., +919876543210)',
  INVALID_OTP: 'Please enter a valid 6-digit OTP',
  OTP_EXPIRED: 'OTP has expired. Please request a new one.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Session expired. Please login again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  OTP_SENT: 'OTP sent successfully!',
  OTP_VERIFIED: 'OTP verified successfully!',
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  USER: 'user',
  THEME: 'theme',
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  VERIFY_OTP: '/verify-otp',
  DASHBOARD: '/dashboard',
};

// Toast Configuration
export const TOAST_CONFIG = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'colored',
};
