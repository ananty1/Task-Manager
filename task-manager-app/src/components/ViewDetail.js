import React from 'react';
import './Modal.css';

const ViewDetail = ({ isOpen, onRequestClose, task }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>Created on: {task.createdDate}</p>
        <button onClick={onRequestClose}>Close</button>
      </div>
    </div>
  );
};

export default ViewDetail;
