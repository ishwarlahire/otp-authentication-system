import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, getUser, setAuthData, clearAuthData } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Temporary storage for OTP verification flow
  const [pendingAuth, setPendingAuth] = useState({
    identifier: '',
    type: '',
  });

  useEffect(() => {
    // Check for existing authentication on mount
    const token = getToken();
    const storedUser = getUser();

    if (token && storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (token, identifier) => {
    setAuthData(token, identifier);
    setUser({ identifier });
    setIsAuthenticated(true);
    setPendingAuth({ identifier: '', type: '' });
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
    setIsAuthenticated(false);
  };

  const setPendingAuthData = (identifier, type) => {
    setPendingAuth({ identifier, type });
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    pendingAuth,
    login,
    logout,
    setPendingAuthData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
