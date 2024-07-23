// src/services/taskService.js
import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/tasks`;

export const getTasks = async () => {
  const token = getToken();
  try{
  const response = await axios.get(API_URL, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data;
}catch (error) {
  throw new Error('Failed to create task: ' + error.response.data.msg);
}

};

export const createTask = async (task) => {
  const token = getToken();
  try {
    const response = await axios.post(API_URL, task, {
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create task: ' + error.response.data.msg);
  }
};

export const updateTask = async (id, updates) => {
  const token = getToken();
  const response = await axios.put(`${API_URL}/${id}`, updates, {
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  return response.data;
};

export const deleteTask = async (id) => {
  const token = getToken();
  await axios.delete(`${API_URL}/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};
