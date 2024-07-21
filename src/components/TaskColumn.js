// src/components/TaskColumn.js
import React from 'react';
import TaskCard from './TaskCard';
import './TaskColumn.css';

const TaskColumn = ({ status }) => {
  const tasks = [
    { id: 1, title: 'Task 1', description: 'Description 1', status },
    { id: 2, title: 'Task 2', description: 'Description 2', status },
  ];

  return (
    <div className="task-column">
      <h2>{status}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskColumn;
