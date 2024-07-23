import React from 'react';
import TaskCard from './TaskCard';
import './TaskColumn.css';

const TaskColumn = ({ tasks, status, handleOnDrag, handleOnDrop, handleOnDragOver, handleOnReorder,handleSave }) => {
  return (
    <div
      className="task-column"
      onDrop={(e) => handleOnDrop(e, status)}
      onDragOver={handleOnDragOver}
    >
      <div className='column-header'>
      <h2>{status}</h2>
      </div>
      {tasks.map((task, index) => (
        <TaskCard
          key={task.id}
          id={task.id}
          status={status}
          task={task}
          handleOnDrag={handleOnDrag}
          handleOnReorder={handleOnReorder}
          handleSave={handleSave}
        />
      ))}
    </div>
  );
};

export default TaskColumn;
