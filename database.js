const { Sequelize } = require('sequelize');

// Update your PostgreSQL connection details here
const sequelize = new Sequelize('appbackend', 'postgres', '123456789', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
