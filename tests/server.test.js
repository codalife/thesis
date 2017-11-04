const request = require('request');

// test('Should have home route', () => {
//  	request.get('http://localhost:8000/')
//  		.on('response', response => {
//  			expect(response.statusCode).toBe(200);

//  		})
// })

test('Should not have random route', () => {
 	return request.get('http://localhost:8000/random')
 		.on('response', response => {
 			return expect(response.statusCode).toBe(500);
 		})
})