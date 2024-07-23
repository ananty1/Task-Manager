// src/components/PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/auth';

const PublicRoute = ({ element }) => {
  const token = getToken();
  return !token ? element : <Navigate to="/tasks" />;
};

export default PublicRoute;
