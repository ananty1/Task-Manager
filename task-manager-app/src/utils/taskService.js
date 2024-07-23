// services/taskService.js
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/tasks`;

export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw error; // Re-throw to handle further up the call chain if needed
  }
};

export const createTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error) {
    console.error('Failed to create task:', error);
    throw error; // Re-throw to handle further up the call chain if needed
  }
};

export const updateTask = async (id, updates) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Failed to update task:', error);
    throw error; // Re-throw to handle further up the call chain if needed
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw error; // Re-throw to handle further up the call chain if needed
  }
};
