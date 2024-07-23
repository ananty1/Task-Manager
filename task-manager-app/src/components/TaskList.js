import React, { useEffect, useState } from 'react';
import TaskColumn from './TaskColumn';
import { getTasks, createTask, updateTask, deleteTask } from '../utils/taskService.js';
import './TaskList.css';

const TaskList = () => {
  const [tasklist, setTaskList] = useState({
    "Pending": [
    ],
    "InProgress": [],
    "Completed": []
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      const categorizedTasks = tasks.reduce((acc, task) => {
        acc[task.status].push(task);
        return acc;
      }, { "Pending": [], "InProgress": [], "Completed": [] });
      setTaskList(categorizedTasks);
    

    };

    fetchTasks();
  }, []);

  const handleOnDrag = (e, id, column_name) => {
    e.dataTransfer.setData("id", id);
    e.dataTransfer.setData("column", column_name);
  };

  const handleOnDrop = async (e, targetColumn) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const sourceColumn = e.dataTransfer.getData("column");

    if (sourceColumn !== targetColumn) {
      const task = tasklist[sourceColumn].find(task => task.id === parseInt(id));
      const updatedSourceColumn = tasklist[sourceColumn].filter(task => task.id !== parseInt(id));
      const updatedTask = { ...task, status: targetColumn };
      await updateTask(task.id, updatedTask);
      const updatedTargetColumn = [...tasklist[targetColumn], task];

      setTaskList({
        ...tasklist,
        [sourceColumn]: updatedSourceColumn,
        [targetColumn]: updatedTargetColumn,
      });
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnReorder = async (sourceId, targetId, column) => {
    const columnTasks = tasklist[column];
    const sourceIndex = columnTasks.findIndex(task => task.id === sourceId);
    const targetIndex = columnTasks.findIndex(task => task.id === targetId);

    const reorderedTasks = [...columnTasks];
    const [movedTask] = reorderedTasks.splice(sourceIndex, 1);
    reorderedTasks.splice(targetIndex, 0, movedTask);
    
    

    setTaskList({
      ...tasklist,
      [column]: reorderedTasks,
    });
  };

  const handleSave = async (updatedTask) => {
    await updateTask(updatedTask.id, updatedTask);
    const updatedTaskList = { ...tasklist };
    Object.keys(updatedTaskList).forEach(column => {
      updatedTaskList[column] = updatedTaskList[column].map(task => 
        task.id === updatedTask.id ? updatedTask : task
      );
    });
    setTaskList(updatedTaskList);
  };

  return (
    <div className='task-page'>
      <div className='add-task'>
      <button>Add Task</button></div>
      <div className='search-bar'>
        <div>
           <strong>Search: </strong><input/>
        </div>
        <div>
          <strong>Sort By: <select> Recent</select></strong>
        </div>
      </div>
    <div className="task-list">
      {Object.keys(tasklist).map(status => (
        <TaskColumn
          key={status}
          status={status}
          tasks={tasklist[status]}
          handleOnDrag={handleOnDrag}
          handleOnDrop={handleOnDrop}
          handleOnDragOver={handleOnDragOver}
          handleOnReorder={handleOnReorder}
          handleSave={handleSave}
        />
      ))}
    </div>
    </div>
  );
};

export default TaskList;
