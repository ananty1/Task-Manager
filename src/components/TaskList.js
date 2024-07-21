// src/components/TaskList.js
import React from 'react';
import TaskColumn from './TaskColumn';
import './TaskList.css';

const TaskList = () => {
  return (
    <div className="task-list">
      <TaskColumn status="Pending" />
      <TaskColumn status="In Progress" />
      <TaskColumn status="Completed" />
    </div>
  );
};

export default TaskList;
