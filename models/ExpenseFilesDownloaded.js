const Sequelize = require('sequelize');

const sequelize = require('../util/database.js');

const ExpenseFilesDownloaded = sequelize.define('expenseFilesDownloaded', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
  },
    
  });
  
  module.exports = ExpenseFilesDownloaded;
  