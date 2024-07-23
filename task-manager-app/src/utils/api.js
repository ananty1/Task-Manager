// src/utils/api.js
import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';
const API_URL = process.env.REACT_APP_BACKEND_URL;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login request failed');
  }
};

export const signupUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users/signup`, user);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Signup request failed');
  }
};
export const googleLoginUser = async (token) => {
  const response = await axios.post(`${API_URL}/users/google-login`, { token });
  return response.data;
};
