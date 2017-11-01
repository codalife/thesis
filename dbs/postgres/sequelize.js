const Sequelize = require('sequelize');

const sequelize = new Sequelize('videos', '', '', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
