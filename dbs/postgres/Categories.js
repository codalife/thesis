const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const Video = require('./Videos');

const Category = sequelize.define('category', {
  title: Sequelize.STRING
})

module.exports = Category;