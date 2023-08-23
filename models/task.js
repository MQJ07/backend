const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user'); // Import the User model

const Task = sequelize.define('Task', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;
