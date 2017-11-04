const pg = require('pg');
delete pg.native; // https://github.com/sequelize/sequelize/issues/3781
const Sequelize = require('sequelize');

const sequelize = new Sequelize('videos', '', '', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
