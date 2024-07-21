// src/utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const signupUser = async (user) => {
  const response = await axios.post(`${API_URL}/signup`, user);
  return response.data;
};
