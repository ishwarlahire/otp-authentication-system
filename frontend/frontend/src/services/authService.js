import api from '../config/api';

/**
 * Send OTP to the user via SMS, WhatsApp, or Email
 * @param {string} identifier - Phone number or email address
 * @param {string} type - 'sms' | 'whatsapp' | 'email'
 * @returns {Promise} API response
 */
export const sendOTP = async (identifier, type) => {
  const response = await api.post('/auth/send-otp', {
    identifier,
    type,
  });
  return response.data;
};

/**
 * Verify OTP and get JWT token
 * @param {string} identifier - Phone number or email address
 * @param {string} otp - 6-digit OTP code
 * @returns {Promise} API response with accessToken
 */
export const verifyOTP = async (identifier, otp) => {
  const response = await api.post('/auth/verify-otp', {
    identifier,
    otp,
  });
  return response.data;
};

/**
 * Store authentication data in localStorage
 * @param {string} token - JWT access token
 * @param {string} identifier - User identifier (phone/email)
 */
export const setAuthData = (token, identifier) => {
  localStorage.setItem('accessToken', token);
  localStorage.setItem('user', JSON.stringify({ identifier }));
};

/**
 * Clear authentication data from localStorage
 */
export const clearAuthData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
};

/**
 * Get stored authentication token
 * @returns {string|null} JWT token or null
 */
export const getToken = () => {
  return localStorage.getItem('accessToken');
};

/**
 * Get stored user data
 * @returns {Object|null} User object or null
 */
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!getToken();
};
