const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-tracker', 'root', 'mysql@50', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;