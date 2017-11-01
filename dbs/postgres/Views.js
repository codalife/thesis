const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const Video = require('./Videos');

const View = sequelize.define('view', {
  date: Sequelize.DATE,
  liked: Sequelize.BOOLEAN,
  state: Sequelize.STRING,
})

View.hasMany(Video);

module.exports = View;