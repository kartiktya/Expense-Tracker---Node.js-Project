const Sequelize = require('sequelize');

const sequelize = require('../util/database.js');

const fogotPasswordRequest = sequelize.define('forgotPasswordRequest', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false
  },
    
  });
  
  module.exports = fogotPasswordRequest;
  