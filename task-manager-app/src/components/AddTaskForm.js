import React, { useState } from 'react';
import { createTask } from '../utils/taskService';
import './AddTaskForm.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, status };
    try {
      await createTask(newTask);
      toast.success('Task created successfully');
      navigate("/tasks");
      // Update task list or reset form here
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      // Error is already handled in createTask
    }
  };
  

  return (
    <form className='add-task-form' onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="InProgress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
