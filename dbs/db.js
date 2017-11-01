const video = require('./postgres/Videos');
const view = require('./postgres/Views');
const category = require('./postgres/Categories');
const sequelize = require('./postgres/sequelize');

module.exports = {sequelize, video, view, category};