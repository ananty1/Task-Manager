// src/components/TaskCard.js
import React, { useState } from 'react';
import './TaskCard.css';
import EditTask from './EditTask';
import ViewDetail from './ViewDetail';

const TaskCard = ({ id, status, task, handleOnDrag, handleOnReorder, handleSave }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("id");
    if (sourceId !== id) {
      handleOnReorder(sourceId, id, status);
    }
  };

  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => handleOnDrag(e, id, status)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p> Created on </p>
      <div className='buttons'>
        <button className='delete'>Delete</button>
        <button className='edit' onClick={() => setIsEditModalOpen(true)}>Edit</button>
        <button className='edit' onClick={() => setIsViewDetailsModalOpen(true)}>View Details</button>
      </div>
      
      <EditTask
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        task={task}
        handleSave={handleSave}
      />
      
      <ViewDetail
        isOpen={isViewDetailsModalOpen}
        onRequestClose={() => setIsViewDetailsModalOpen(false)}
        task={task}
      />
    </div>
  );
};

export default TaskCard;
