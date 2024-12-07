// models/service.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
  serialNo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  branchName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  serviceDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  serviceTimeFrom: {
    type: DataTypes.TIME,
    allowNull: true
  },
  serviceTimeTo: {
    type: DataTypes.TIME,
    allowNull: true
  },
  customerFeedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  technicianName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  technicianSignature: {
    type: DataTypes.TEXT, // Data URI for technician's signature
    allowNull: true
  },
  customerSignature: {
    type: DataTypes.TEXT, // Data URI for customer's signature
    allowNull: true
  },
  customerPhoto: {
    type: DataTypes.TEXT, // Data URI for customer's signature
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // Referencing the Users table
      key: 'id'
    },
    allowNull: false
  }
});

module.exports = Service;
