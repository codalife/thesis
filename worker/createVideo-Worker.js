const http = require('http');
const db = require('../dbs/db');
const moment = require('moment');
const gen = require('sentence-generator');

const Gen = gen('./lepetite.txt');

function createVideo() {
	let interval = Math.random() * 1000 + 1000;
	console.log(`interval: ${interval}`)

	let count = 0;
	const videos = [];

	while (count < 10) {

		count += 1;
		videos.push({
			createdAt: moment().subtract(Math.floor(Math.random() * 100), 'days').format(),
			updatedAt: moment().format(),
			category_id: Math.floor(Math.random() * 17) + 1,
			title: Gen.take(1),
		})
	}

	setTimeout(() => {
		console.log(videos[5]);
		db.video.bulkCreate(videos)
			.then(() => {
				console.log('succeess');
				createVideo();
			});
	}, interval);
}

createVideo();