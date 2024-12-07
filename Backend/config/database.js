// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('technician_service', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
