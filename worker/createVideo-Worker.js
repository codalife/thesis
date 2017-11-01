const http = require('http');


function createVideo() {
	let interval = Math.random() * 100000 + 1000;

	setTimeout(() => {
		http.get({
		  hostname: 'localhost',
		  port: 8000,
		  path: '/',
		  agent: false  // create a new agent just for this one request
		}, (res) => {
			createVideo();
		});
	}, interval);
}

createVideo();