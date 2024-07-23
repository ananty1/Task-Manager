// services/taskService.js
// const API_URL = 'http://localhost:5000/api/tasks';
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/tasks`;

export const getTasks = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createTask = async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    return response.json();
  } catch (error) {
    throw error; // Re-throw to handle further up the call chain if needed
  }
};

export const updateTask = async (id, updates) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  return response.json();
};

export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
