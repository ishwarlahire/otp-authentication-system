/**
 * Validation utility functions
 */

/**
 * Validate email address format
 * @param {string} email - Email address to validate
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format (international)
 * @param {string} phone - Phone number to validate
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  // Accepts formats like +919876543210, +1234567890, etc.
  const phoneRegex = /^\+?[1-9]\d{9,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate OTP format (6 digits)
 * @param {string} otp - OTP to validate
 * @returns {boolean}
 */
export const isValidOTP = (otp) => {
  const otpRegex = /^\d{6}$/;
  return otpRegex.test(otp);
};

/**
 * Sanitize input to prevent XSS
 * @param {string} input - Input string to sanitize
 * @returns {string}
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Format phone number for display
 * @param {string} phone - Phone number to format
 * @returns {string}
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  // Basic formatting - can be enhanced based on country code
  const cleaned = phone.replace(/\s/g, '');
  if (cleaned.startsWith('+91') && cleaned.length === 13) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 8)} ${cleaned.slice(8)}`;
  }
  return phone;
};

/**
 * Mask identifier for privacy
 * @param {string} identifier - Email or phone to mask
 * @param {string} type - 'email' or 'phone'
 * @returns {string}
 */
export const maskIdentifier = (identifier, type) => {
  if (!identifier) return '';
  
  if (type === 'email') {
    const [localPart, domain] = identifier.split('@');
    if (localPart.length <= 2) return identifier;
    return `${localPart.slice(0, 2)}***@${domain}`;
  }
  
  // Phone number
  if (identifier.length <= 4) return identifier;
  return `${identifier.slice(0, 3)}****${identifier.slice(-4)}`;
};
