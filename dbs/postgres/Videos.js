const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const Category = require('./Categories');

const Video = sequelize.define('video', {
	title: Sequelize.STRING,
	createdAt: Sequelize.DATE,
	category_id: {
		type: Sequelize.INTEGER,
		references: {
			model: "category",
			key: "id"
		}
	}

})

module.exports = Video;