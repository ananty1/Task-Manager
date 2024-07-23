const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth'); // Ensure this middleware extracts user ID from the token

// Get tasks for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    
    const tasks = await Task.find({ userId: req.user._id });
    
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Create a new task
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description,status } = req.body;
    const newTask = new Task({
      title,
      description,
      status,
      userId: req.user.id
    });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update task
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    const { title, description ,status} = req.body;
    task.title = title;
    task.description = description;
    task.status = status;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // console.log("Task is", typeof(task), task.userId);

    if (task.userId.toString() !== req.user._id.toString()) {
      console.log("User not authorized to delete this task");
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Task.findByIdAndDelete(task._id.toString());
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;
