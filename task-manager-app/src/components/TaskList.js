// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import TaskColumn from './TaskColumn';
import { getTasks, createTask, updateTask, deleteTask } from '../utils/taskService.js';
import './TaskList.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const TaskList = () => {
  const [tasklist, setTaskList] = useState({
    "Pending": [],
    "InProgress": [],
    "Completed": []
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        console.log("Received tasks:", tasks);
        const categorizedTasks = tasks.reduce((acc, task) => {
          if (task.status in acc) {
            acc[task.status].push(task);
          } else {
            console.warn(`Unexpected task status: ${task.status}`);
          }
          return acc;
        }, { "Pending": [], "InProgress": [], "Completed": [] });
        console.log("Categorized tasks:", categorizedTasks);
        setTaskList(categorizedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        toast.error('Failed to fetch tasks: ' + error.message);
      }
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
      const task = tasklist[sourceColumn].find(task => task._id === id);
      const updatedSourceColumn = tasklist[sourceColumn].filter(task => task._id !== id);
      const updatedTask = { ...task, status: targetColumn };
      await updateTask(id, updatedTask);
      const updatedTargetColumn = [...tasklist[targetColumn], updatedTask];

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
    const sourceIndex = columnTasks.findIndex(task => task._id === sourceId);
    const targetIndex = columnTasks.findIndex(task => task._id === targetId);

    const reorderedTasks = [...columnTasks];
    const [movedTask] = reorderedTasks.splice(sourceIndex, 1);
    reorderedTasks.splice(targetIndex, 0, movedTask);

    setTaskList({
      ...tasklist,
      [column]: reorderedTasks,
    });
  };

  const handleSave = async (updatedTask) => {
    await updateTask(updatedTask._id, updatedTask);
    const updatedTaskList = { ...tasklist };
    Object.keys(updatedTaskList).forEach(column => {
      updatedTaskList[column] = updatedTaskList[column].map(task =>
        task._id === updatedTask._id ? updatedTask : task
      );
    });
    setTaskList(updatedTaskList);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);

      const updatedTaskList = { ...tasklist };
      Object.keys(updatedTaskList).forEach(column => {
        updatedTaskList[column] = updatedTaskList[column].filter(task => task._id !== id);
      });
      setTaskList(updatedTaskList);

    } catch (error) {
      console.error('Failed to delete task:', error);
      // Display error to the user (e.g., using a toast notification)
    }
  };

  return (
    <div className='task-page'>
      <div className='add-task'>
        <button onClick={() => navigate("/create-task")}>Add Task</button>
      </div>
      <div className='search-bar'>
        <div>
          <strong>Search: </strong><input />
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
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
