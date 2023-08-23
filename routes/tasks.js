const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const User = require('../models/user');

router.post('/', async (req, res) => {
  try {
    const { userId, name, status } = req.body;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newTask = await Task.create({ userId, name, status });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const { name, status } = req.body;

    // Find the task by ID
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task's properties
    task.name = name;
    task.status = status;

    await task.save(); // Save the changes

    res.json(task); // Return the updated task
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;

    // Find the task by ID
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy(); // Delete the task

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
