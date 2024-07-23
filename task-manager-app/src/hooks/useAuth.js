// src/hooks/useAuth.js
import { useState } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    // Add login logic here
    setIsAuthenticated(true);
  };

  const signup = (user) => {
    // Add signup logic here
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    signup,
    logout,
  };
};

export default useAuth;
