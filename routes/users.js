const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, password } = req.body;

    // Find the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's properties
    user.username = username;
    user.password = password; // You should hash the password before saving

    await user.save(); // Save the changes

    res.json(user); // Return the updated user
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy(); // Delete the user

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



module.exports = router;
