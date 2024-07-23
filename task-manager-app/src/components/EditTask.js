import React, { useState } from 'react';
import './Modal.css';

const EditTask = ({ isOpen, onRequestClose, task, handleSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  if (!isOpen) return null;

  const handleSubmit = () => {
    handleSave({ ...task, title, description });
    onRequestClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onRequestClose}>Close</button>
      </div>
    </div>
  );
};

export default EditTask;
