// src/components/TaskCard.js
import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskCard;
