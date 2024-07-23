// src/utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

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
