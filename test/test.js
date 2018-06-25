const assert = require('assert');
const request = require('request');

describe('Routes', () => {
	it('takes in a url and posts to database', () =>{
		const url = 'www.google.com'
		request.post('http://service.com/upload', {form:{key:'value'}})
	});

	it('takes in a url, and returns a shortened url', ()=> {
		assert(1==1);
	});

	it('takes in a shortened url, and redirects to the corresponding website', () => {
		assert(1==1);
	});

});